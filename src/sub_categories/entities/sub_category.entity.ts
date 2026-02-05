import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import GraphQLJSON from 'graphql-type-json';
import { Product } from '../../products/entities/product.entity';
import { BlogStatus } from '../../general/dto/enums/enum';

@ObjectType()
export class SubCategory {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => GraphQLJSON, { nullable: true })
  posterImageUrl?: any;

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

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field({ nullable: true })
  Recall_subCat?: string;

  @Field({ nullable: true })
  short_description?: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  whatAmiImage?: any[];

  @Field(() => GraphQLJSON, { nullable: true })
  whatAmiImageBanner?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  homePageImage?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  whatamIdetails?: any;

  @Field({ nullable: true })
  whatAmiTopHeading?: string;

  @Field({ nullable: true })
  Heading?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  BannerImage?: any;

  @Field(() => [Category], { nullable: true })
  recalledByCategories?: Category[];

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  whatIamEndpoint?: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  sizes?: any[];

  @Field({ nullable: true })
  whatAmiMeta_Title: string;
  @Field({ nullable: true })
  whatAmiCanonical_Tag: string;
  @Field({ nullable: true })
  whatAmiMeta_Description: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}
