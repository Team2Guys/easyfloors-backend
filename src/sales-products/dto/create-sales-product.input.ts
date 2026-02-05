import {
  InputType,
  Int,
  Field,
  Float,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export enum OrderStatus {
  placed = 'placed',
  shipped = 'shipped',
  delivered = 'delivered',
  cancel = 'cancel',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Status of the order (placed, shipped, delivered, cancel)',
});
@InputType()
export class CreateOrderInput {
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

  @Field({ nullable: true })
  otherCity?: string;

  @Field(() => [GraphQLJSON])
  products: any[];

  @Field(() => Float)
  shipmentFee: number;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => GraphQLJSON)
  shippingMethod: any;

  @Field(() => OrderStatus, { nullable: true })
  orderStatus?: OrderStatus;

  @Field(() => Date, { nullable: true })
  deliveryDate: Date;
}

// Input DTO for the Product (used within CreateOrderInput)
@InputType()
export class ProductInput {
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

  @Field(() => Int)
  requiredBoxes: number;
}

@InputType()
export class contactUsEmailInput {
  @Field()
  firstName: string;
  @Field()
  LastName: string;
  @Field()
  email: string;
  @Field()
  phoneNumber: string;
  @Field()
  message: string;
}

@InputType()
export class PaymentQueryDto {
  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field({ nullable: true })
  integrationId?: string;

  @Field({ nullable: true })
  orderId?: string;

  @Field(() => Boolean, { nullable: true })
  pending?: boolean;

  @Field({ nullable: true })
  is3DSecure?: string;

  @Field({ nullable: true })
  pay_methodType?: string;

  @Field({ nullable: true })
  cardLastDigits?: string;

  @Field({ nullable: true })
  paymethod_sub_type?: string;
}

@InputType()
export class orderEmailInput extends PartialType(CreateOrderInput) {
  @Field()
  orderId: string;

  @Field()
  transactionDate: Date;
  @Field(() => Boolean, { nullable: true })
  isfreesample?: boolean;
}
