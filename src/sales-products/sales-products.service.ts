import { Injectable } from '@nestjs/common';
import {
  contactUsEmailInput,
  CreateOrderInput,
  orderEmailInput,
  OrderStatus,
  PaymentQueryDto,
  ProductInput,
} from './dto/create-sales-product.input';
import {
  contactusEmail,
  customHttpException,
  sendEmailHandler,
} from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createSalesProductInput: CreateOrderInput) {
    try {
      const { totalPrice, shipmentFee, products, ...billing_data } =
        createSalesProductInput;
      const orderId = `ORD-${Date.now()}`;
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        `Token ${process.env.PAYMOB_SECRET_KEY}`,
      );
      myHeaders.append('Content-Type', 'application/json');

      const totalAmount = [
        { name: 'tax Fee', amount: Math.ceil(totalPrice * 100) },
      ];

      let raw = JSON.stringify({
        amount: Math.ceil(totalPrice * 100),
        currency: process.env.PAYMOD_CURRENCY,
        payment_methods: [57660, 52375, 52374, 52172],
        items: totalAmount,
        billing_data: {
          ...billing_data,
          first_name: billing_data.firstName,
          last_name: billing_data.lastName,
          email: billing_data.email,
          phone_number: billing_data.phone,
        },
        special_reference: orderId,
        redirection_url: 'https://easyfloors.ae/thank-you' as RequestRedirect,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };

      let response = await fetch(
        'https://uae.paymob.com/v1/intention/',
        requestOptions,
      );
      console.log(response, 'response');

      let result = await response.json();

      console.log(result.intention_order_id, 'intention id');
      if (!result.intention_order_id)
        return customHttpException('Order Id not found ', 'NOT_FOUND');

      await this.prisma.salesProducts.create({
        data: {
          ...createSalesProductInput,
          orderId: String(result.intention_order_id),
          checkout: true,
          currency: 'AED',
          isfreesample: createSalesProductInput.products.some(
            (item) => item.isfreeSample,
          ),
          products: createSalesProductInput.products,
        },
      });

      console.log(result, 'result');
      return { paymentKey: result };
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      let orders =  await this.prisma.salesProducts.findMany();
console.log(orders, 'orders');
      return orders;
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
    try {
      const order = await this.prisma.salesProducts.findUnique({
        where: { orderId },
      });

      if (!order) {
        customHttpException(`Order with ID ${orderId} not found`);
        return;
      }

    const updatedOrder = await this.prisma.salesProducts.update({
      where: { orderId },
      data: { orderStatus },
    });
    if(orderStatus.toLowerCase() === 'shipped' || orderStatus.toLowerCase() === 'delivered'){
      await sendEmailHandler(updatedOrder as orderEmailInput , order.email, orderStatus);
    }
    return updatedOrder;
  } catch (error) {
    return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
  }
}

 async updateOrderdeliveryDate(orderId: string, deliveryDate: Date) {
  try {
    const order = await this.prisma.salesProducts.findUnique({
      where: { orderId },
    });

    if (!order) {
      customHttpException(`Order with ID ${orderId} not found`);
      return;
    }

    const updatedOrder = await this.prisma.salesProducts.update({
      where: { orderId },
      data: { deliveryDate  },
    });

    return updatedOrder;
  } catch (error) {
    return customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
  }
}

  async findOne(id: string) {
    try {
      return await this.prisma.salesProducts.findFirst({
        where: { orderId: id },
      });
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOrderByMail(email: string) {
    try {
      console.log(email, 'email');
      let users = await this.prisma.salesProducts.findMany({
        where: { email },
      });
      console.log(users, 'users');
      return users;
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async get_all_records() {
    try {

      const [
        totalProducts,
        totalCategories,
        totalSubCategories,
        totalUsers,
        totalAdmins,
        totalAccessories,
        appointments,
        salesProdu
      ] = await Promise.all([
        this.prisma.products.count(),
        this.prisma.category.count(),
        this.prisma.subCategories.count(),
        this.prisma.user.count(),
        this.prisma.admins.count(),
        this.prisma.acessories.count(),
        this.prisma.appointment.findMany(),
        this.prisma.salesProducts.findMany(),
      ]);
    
      const reducer_handler = (arr: any[], Boxes?: boolean) => {
        return arr.reduce((totalQuantity: number, currentValue: any) => {
          const productQuantitySum = currentValue.products.reduce(
            (productTotal: number, value: any) => {
              let boxesFlag = Boxes ? 'squareMeter' : 'requiredBoxes';

              return productTotal + value[boxesFlag];
            },
            0,
          );
          return totalQuantity + productQuantitySum;
        }, 0);
      };

      let sucessfulpayment = salesProdu.filter(
        (prod: any) => prod.paymentStatus,
      );
      let totalSales = reducer_handler(sucessfulpayment);

      let abdundant = salesProdu.filter(
        (prod: any) => prod.checkout && !prod.paymentStatus,
      );
      let freeSampleOrders = salesProdu.filter(
        (prod: any) =>
          prod.checkout && !prod.paymentStatus && prod.isfreesample,
      );

      let Total_abandant_order = reducer_handler(abdundant);

      let totalRevenue = sucessfulpayment.reduce(
        (accumulator: any, currentValue: any) => {
          let totalsales = currentValue.products.reduce(
            (accum: number, value: any) => {
              return (accum += value.totalPrice);
            },
            0,
          );

          return Math.ceil(accumulator + totalsales);
        },
        0,
      );

      let InstallationAppointments = appointments.filter(
        (value) => value.AppointsType == 'installations',
      )?.length;
      let MeasureAppointments = appointments.filter(
        (value) => value.AppointsType == 'appointments',
      )?.length;
      return {
        totalSubCategories,
        totalProducts,
        totalCategories,
        totalAdmins,
        totalRevenue,
        totalSoldProducts: totalSales,
        totalUsers,
        totalabundantOrderProd: Total_abandant_order,
        totalAccessories,
        Orders: sucessfulpayment.length,
        abdundantOrders: abdundant.length,
        freeSamples: freeSampleOrders.length,
        InstallationAppointments,
        MeasureAppointments,
      };
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async postpaymentStatus(postpayment: PaymentQueryDto) {
    try {
      const { orderId } = postpayment;

      let existingOrder = await this.prisma.salesProducts.findFirst({
        where: { orderId },
      });
      console.log(existingOrder, 'existingOrder');
      if (!existingOrder) {
        customHttpException('Order not found', 'NOT_FOUND');
        return;
      }

      if (existingOrder.paymentStatus) {
        console.log(existingOrder.paymentStatus, 'existingOrder.paymentStatus');
        customHttpException('Payment status already updated', 'BAD_REQUEST');
      }

      const paymentStatus = await this.prisma.salesProducts.update({
        where: { orderId },
        data: {
          ...postpayment,
          checkout: false,
          paymentStatus: true,
          transactionDate: new Date(),
        },
      });

      const products = JSON.parse(JSON.stringify(existingOrder.products));
      if (
        Array.isArray(products) &&
        products.length > 0 &&
        !products.some((item) => item.isfreeSample)
      ) {
        for (const prod of products) {
          let category = prod.category?.trim()?.toLowerCase();
          let accessoryFlag =
            category == 'accessories' || category == 'accessory'
              ? 'acessories'
              : 'products';
          console.log(accessoryFlag, 'flag');
          await this.prisma[accessoryFlag].update({
            where: { id: prod.id },
            data: {
              stock: {
                decrement: prod.requiredBoxes,
              },
            },
          });
        }
      }

      await sendEmailHandler(
        existingOrder as orderEmailInput,
        existingOrder.email,
      );

      return paymentStatus;
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async contactUs(userDetails: contactUsEmailInput) {
    try {
      let message = await contactusEmail(userDetails);

      return {
        message: 'Email sent successfully',
      };
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async freeSample(createSalesProductInput: CreateOrderInput) {
    try {
      const { totalPrice, shipmentFee, products, ...billing_data } =
        createSalesProductInput;
      const orderId = Date.now();
      console.log(orderId, 'order id ');
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        `Token ${process.env.PAYMOB_SECRET_KEY}`,
      );
      myHeaders.append('Content-Type', 'application/json');
      let existingOrder = await this.prisma.salesProducts.create({
        data: {
          ...createSalesProductInput,
          orderId: String(orderId),
          checkout: true,
          currency: 'AED',
          isfreesample: true,
          products: createSalesProductInput.products,
          shipmentFee: shipmentFee,
        },
      });

      await sendEmailHandler(
        existingOrder as orderEmailInput,
        existingOrder.email,
      );
      return { paymentKey: orderId };
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAllFreesample() {
    try {
      return await this.prisma.salesProducts.findMany({
        where: { isfreesample: true },
      });
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  // Monthly Orders

  async getMonthlyAppointments() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based

    // Fetch appointments from Jan 1st to end of current month
    const orders = await this.prisma.salesProducts.findMany({
      where: {
        checkoutDate: {
          gte: new Date(currentYear, 0, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    });

    // Group appointments by year and month
    const monthlyData = orders.reduce(
      (acc, appointment) => {
        const date = new Date(appointment?.checkoutDate ?? '');
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            count: 0,
          };
        }

        acc[key].count += 1;

        return acc;
      },
      {} as Record<string, { year: number; month: number; count: number }>,
    );

    const result = Object.values(monthlyData).map((data: any) => ({
      year: data.year,
      month: data.month + 1,
      count: data.count,
    }));

    // Sort by year/month
    result.sort((a, b) => a.year - b.year || a.month - b.month);

    // Generate a complete array with all months till current one
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const completeMonthlyData = Array.from(
      { length: currentMonth + 1 },
      (_, i) => ({
        month: `${monthNames[i]} ${currentYear}`,
        Orders: 0,
      }),
    );

    // Fill in the counts
    result.forEach((item) => {
      const index = item.month - 1;
      completeMonthlyData[index] = {
        month: `${monthNames[index]} ${item.year}`,
        Orders: item.count,
      };
    });
    console.log(completeMonthlyData, 'completeMonthlyData');
    return { completeMonthlyData };
  }

  async getLast7DaysStats() {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 6); // last 7 days including today

    const dateKeys = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0]; // e.g., "2025-06-23"
    });

    // Fetch appointments
    const appointments = await this.prisma.salesProducts.findMany({
      where: {
        checkoutDate: {
          gte: startDate,
          lte: today,
        },
      },
    });

    const dailyAppointmentsMap = appointments.reduce(
      (acc, appointment) => {
        const key = new Date(appointment?.checkoutDate ?? '')
          .toISOString()
          .split('T')[0];
        if (!acc[key]) acc[key] = 0;
        acc[key] += 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Merge data with day name
    const finalStats = dateKeys.map((dateStr) => {
      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      return {
        date: dateStr,
        day: dayName,
        orders: dailyAppointmentsMap[dateStr] || 0,
      };
    });

    console.log(finalStats, 'finalStats');
    return finalStats;
  }
}
