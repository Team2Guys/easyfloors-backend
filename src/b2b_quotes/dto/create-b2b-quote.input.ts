import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateB2bQuoteInput {
  @Field()
  fullName: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  companyName: string;

  @Field({ nullable: true })
  role?: string;

  @Field()
  quantity: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  productRequired?: any[];

  @Field({ nullable: true })
  projectStatus?: string;

  @Field({ nullable: true })
  budgetRange?: string;

  @Field({ nullable: true })
  additionalInfo?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  tradeLicense?: any;

  @Field()
  trnNumber: string;
}
