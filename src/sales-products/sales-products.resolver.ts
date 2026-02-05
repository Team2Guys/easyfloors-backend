import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesProductsService } from './sales-products.service';
import {
  ALL_RECORDS,
  contactUsEmail,
  Last7DaysStat,
  monthlyChart,
  paymentStatus,
  SalesProduct,
  UpdateSalesProductStatus,
} from './entities/sales-product.entity';
import {
  contactUsEmailInput,
  CreateOrderInput,
  OrderStatus,
  PaymentQueryDto,
} from './dto/create-sales-product.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => SalesProduct)
export class SalesProductsResolver {
  constructor(private readonly salesProductsService: SalesProductsService) {}

  @Public()
  @Mutation(() => SalesProduct)
  createSalesProduct(
    @Args('createSalesProductInput') createSalesProductInput: CreateOrderInput,
  ) {
    return this.salesProductsService.create(createSalesProductInput);
  }

  @Public()
  @Mutation(() => SalesProduct, { nullable: true })
  freeSample(@Args('createFreesample') createFreesample: CreateOrderInput) {
    return this.salesProductsService.freeSample(createFreesample);
  }

  @Public()
  @Mutation(() => paymentStatus, { nullable: true })
  postpaymentStatus(
    @Args('postpaymentStatus') updatepaymentstatusInput: PaymentQueryDto,
  ) {
    return this.salesProductsService.postpaymentStatus(
      updatepaymentstatusInput,
    );
  }

  @Public()
  @Query(() => [paymentStatus], { name: 'AllOrders' })
  findAll() {
    return this.salesProductsService.findAll();
  }

  @Public()
  @Mutation(() => UpdateSalesProductStatus, { nullable: true })
  async updateOrderStatus(
    @Args('orderId', { type: () => String }) orderId: string,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ) {
    return this.salesProductsService.updateOrderStatus(orderId, status);
  }


    @Public()
  @Mutation(() => UpdateSalesProductStatus, { nullable: true })
  async updateOrderDeliveryDate(
    @Args('orderId', { type: () => String }) orderId: string,
    @Args('deliveryDate', { type: () => Date }) deliveryDate: Date,
  ) {
    return this.salesProductsService.updateOrderdeliveryDate(orderId, deliveryDate);
  }



  @Public()
  @Query(() => [paymentStatus], { name: 'AllOrdersFree' })
  findAllFreesample() {
    return this.salesProductsService.findAllFreesample();
  }

  @Public()
  @Query(() => paymentStatus, { name: 'Order' })
  findOne(@Args('orderId', { type: () => String }) orderId: string) {
    return this.salesProductsService.findOne(orderId);
  }

  @Public()
  @Query(() => [paymentStatus], { name: 'usersOrders' })
  OrdersMyMail(@Args('email', { type: () => String }) email: string) {
    return this.salesProductsService.findOrderByMail(email);
  }

  @Public()
  @Query(() => ALL_RECORDS, { name: 'GET_ALL_RECORDS' })
  get_all_records() {
    return this.salesProductsService.get_all_records();
  }

  @Public()
  @Mutation(() => contactUsEmail)
  Contact_email(@Args('contactUsEmail') contactUsEmail: contactUsEmailInput) {
    return this.salesProductsService.contactUs(contactUsEmail);
  }

  @Public()
  @Query(() => monthlyChart, { name: 'MONTHLYCHARTS' })
  getMonthlyAppointments() {
    return this.salesProductsService.getMonthlyAppointments();
  }

  @Public()
  @Query(() => [Last7DaysStat], { name: 'WEEKLYCHARTS' })
  getLast7DaysStats() {
    return this.salesProductsService.getLast7DaysStats();
  }
}
