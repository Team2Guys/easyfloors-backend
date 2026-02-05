import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { OrderStatus } from 'sales-products/dto/create-sales-product.input';

@ObjectType()
export class SalesProduct {
  @Field(() => GraphQLJSON)
  paymentKey: any;
}

@ObjectType()
export class UpdateSalesProductStatus {
  @Field()
  orderId: string;

  @Field(() => OrderStatus)
  orderStatus: OrderStatus;

  @Field(() => Date, { nullable: true })
  deliveryDate?: Date;
}

@ObjectType()
export class ALL_RECORDS {
  @Field(() => Int, { nullable: true })
  totalSubCategories: number;
  @Field(() => Int, { nullable: true })
  totalProducts: number;

  @Field(() => Int, { nullable: true })
  totalCategories: number;
  @Field(() => Int, { nullable: true })
  totalAdmins: number;
  @Field(() => Int, { nullable: true })
  totalRevenue: number;
  @Field(() => Int, { nullable: true })
  totalSoldProducts: number;
  @Field(() => Int, { nullable: true })
  totalUsers: number;
  @Field(() => Int, { nullable: true })
  totalabundantOrderProd: number;
  @Field(() => Int, { nullable: true })
  totalAccessories: number;
  @Field(() => Int, { nullable: true })
  Orders: number;
  @Field(() => Int, { nullable: true })
  abdundantOrders: number;

  @Field(() => Int, { nullable: true })
  freeSamples: number;

  @Field(() => Int, { nullable: true })
  InstallationAppointments: number;
  @Field(() => Int, { nullable: true })
  MeasureAppointments: number;
}

@ObjectType()
export class contactUsEmail {
  @Field()
  message: string;
}

@ObjectType()
export class SelectedColorDto {
  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  altText?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  colorName?: string;

  @Field({ nullable: true })
  public_id?: string;
}

@ObjectType()
export class Products {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field()
  image: string;

  @Field()
  subcategories: string;

  @Field()
  category: string;

  @Field()
  boxCoverage: string;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => Float)
  pricePerBox: number;

  @Field()
  squareMeter: string;

  @Field({ nullable: true })
  custom_url?: string;

  @Field(() => Int)
  requiredBoxes: number;

  @Field(() => SelectedColorDto, { nullable: true })
  selectedColor?: SelectedColorDto;

  @Field(() => Boolean, { nullable: true })
  isClearance?: boolean;

  @Field(() => Float, { nullable: true })
  installationCost: number;

  @Field(() => Boolean, { nullable: true })
  addInstallation?: boolean;
}

@ObjectType()
export class paymentStatus {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  note: string;

  @Field()
  phone: string;

  @Field()
  emirate: string;

  @Field()
  orderId: string;

  @Field({ nullable: true })
  transactionDate: Date;

  @Field(() => [Products])
  products?: Products[] | undefined;

  @Field(() => Float)
  shipmentFee: number;

  @Field(() => Float)
  totalPrice: number;

  @Field({ nullable: true })
  pay_methodType: string;

  @Field({ nullable: true })
  paymethod_sub_type: string;

  @Field(() => Int, { nullable: true })
  cardLastDigits: number;

  @Field(() => Boolean, { nullable: true })
  checkout: boolean;

  @Field(() => Boolean, { nullable: true })
  paymentStatus: boolean;

  @Field(() => Boolean, { nullable: true })
  isRefund: boolean;

  @Field(() => Boolean, { nullable: true })
  success: boolean;

  @Field(() => Boolean, { nullable: true })
  pending: boolean;

  @Field(() => Boolean, { nullable: true })
  isfreesample: boolean;

  @Field({ nullable: true })
  currency: string;

  @Field({ nullable: true })
  is3DSecure: string;

  @Field({ nullable: true })
  checkoutDate: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  shippingMethod: any;


  @Field({ nullable: true })
  orderStatus: string;

  @Field(() => Date, { nullable: true })
  deliveryDate?: Date;
}

@ObjectType()
export class Last7DaysStat {
  @Field()
  date: string;

  @Field()
  day: string;

  @Field(() => Int)
  orders: number;
}

@ObjectType()
export class MonthlyData {
  @Field()
  month: string;

  @Field(() => Int)
  Orders: number;
}

@ObjectType()
export class monthlyChart {
  @Field(() => [MonthlyData])
  completeMonthlyData: MonthlyData[];
}
