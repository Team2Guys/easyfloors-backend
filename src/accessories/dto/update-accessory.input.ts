import { CreateAccessoryInput } from './create-accessory.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAccessoryInput extends PartialType(CreateAccessoryInput) {
  @Field(() => ID)
  id: number;
}
