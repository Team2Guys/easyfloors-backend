import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { BlogStatus } from 'general/dto/enums/enum';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateAccessoryInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int, { nullable: true })
  discountPrice: number;

  @Field()
  description: string;

  @Field(() => Int)
  stock: number;

  @Field(() => GraphQLJSON)
  posterImageUrl: any;

  @Field(() => GraphQLJSON, { nullable: true })
  hoverImageUrl: any;

  @Field(() => [GraphQLJSON])
  productImages: any[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  Canonical_Tag: string;

  @Field({ nullable: true })
  Meta_Description: string;

  @Field({ nullable: true })
  Meta_Title: string;

  @Field({ nullable: true })
  last_editedBy: string;

  @Field()
  custom_url: string;

  @Field(() => [GraphQLJSON])
  AdditionalInformation: any[];

  @Field(() => [GraphQLJSON], { nullable: true })
  FAQS?: any[];

  @Field({ nullable: true })
  boxCoverage: string;

  @Field(() => ID, { nullable: true })
  category: Number;

  @Field(() => [GraphQLJSON], { nullable: true })
  featureImages?: any[];

  @Field(() => [GraphQLJSON], { nullable: true })
  sizes?: any[];

  @Field(() => GraphQLJSON, { nullable: true })
  products: any;

  @Field(() => String, { nullable: true })
  lengthPrice?: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
  @Field(() => String, { nullable: true })
  sku?: string;
}
