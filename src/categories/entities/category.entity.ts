import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Product } from '../../products/entities/product.entity';
import { SubCategory } from '../../sub_categories/entities/sub_category.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { BlogStatus } from 'general/dto/enums/enum';

@ObjectType()
export class Category {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => GraphQLJSON)
  posterImageUrl: any;

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

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => [SubCategory], { nullable: true })
  subcategories?: SubCategory[];

  @Field({ nullable: true })
  Recall_Cat?: string;

  @Field({ nullable: true })
  short_description?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  whatAmiImageBanner: any;

  @Field({ nullable: true })
  topHeading?: string;

  @Field({ nullable: true })
  RecallUrl?: string;

  @Field(() => [Accessory], { nullable: true })
  accessories?: Accessory[];

  @Field(() => [SubCategory], { nullable: true })
  recalledSubCats?: SubCategory[];

  @Field({ nullable: true })
  price?: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}
