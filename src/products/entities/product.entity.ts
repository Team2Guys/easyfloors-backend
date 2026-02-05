import { Int, Field, ObjectType, ID } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import { GraphQLJSON } from 'graphql-type-json';
import { SubCategory } from '../../sub_categories/entities/sub_category.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { BlogStatus } from 'general/dto/enums/enum';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

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

  @Field(() => Int, { nullable: true })
  colorCode?: number;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  stockUpdateDate: Date;

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

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => SubCategory, { nullable: true })
  subcategory?: SubCategory;

  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field(() => [GraphQLJSON])
  FAQS: any[];

  @Field({ nullable: true })
  boxCoverage: string;

  @Field(() => [GraphQLJSON])
  featureImages: any[];

  @Field(() => [Accessory], { nullable: true })
  acessories?: Accessory[];

  @Field(() => [GraphQLJSON])
  colors: any[];
  @Field(() => [GraphQLJSON], { nullable: true })
  sizes?: any[];

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;

  @Field(() => String, { nullable: true })
  sku?: string;
}
