import { CreateOrderInput } from './create-sales-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesProductInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
  id: number;
}
