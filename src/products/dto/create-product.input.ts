import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { BlogStatus } from '../../general/dto/enums/enum';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'products name' })
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

  @Field(() => Int, { nullable: true })
  colorCode?: number;

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

  @Field(() => Boolean, { nullable: true })
  waterproof: boolean;

  @Field(() => [GraphQLJSON])
  AdditionalInformation: any[];

  @Field({ nullable: true })
  plankWidth: string;

  @Field({ nullable: true })
  thickness: string;

  @Field({ nullable: true })
  ResidentialWarranty: string;

  @Field({ nullable: true })
  CommmericallWarranty: string;

  @Field(() => ID, { nullable: true })
  category?: number | any;

  @Field(() => Int, { nullable: true })
  categoryId?: number | any;

  @Field(() => ID, { nullable: true })
  subcategory?: number | any;

  @Field(() => [GraphQLJSON])
  FAQS: any[];

  @Field({ nullable: true })
  boxCoverage: string;

  @Field(() => [GraphQLJSON])
  featureImages: any[];

  @Field(() => [GraphQLJSON])
  colors: any[];

  @Field(() => ID, { nullable: true })
  acessories?: number;

  @Field(() => [GraphQLJSON], { nullable: true })
  sizes?: any[];

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;

  @Field(() => String, { nullable: true })
  sku?: string;
}
