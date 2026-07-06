import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequestCallbackInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  whatsapp?: string;
}
