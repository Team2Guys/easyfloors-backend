import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { BlogStatus } from '../../general/dto/enums/enum';
import GraphQLJSON from 'graphql-type-json';
import { CreateProductInput } from '../../products/dto/create-product.input';
import { CreateSubCategoryInput } from '../../sub_categories/dto/create-sub_category.input';

@InputType()
export class CreateCategoryInput {
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
  @Field({ nullable: true })
  short_description: string;

  @Field()
  custom_url: string;

  @Field({ nullable: true })
  Recall_Cat?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  whatAmiImageBanner: any;

  @Field({ nullable: true })
  topHeading?: string;

  @Field({ nullable: true })
  RecallUrl?: string;

  @Field({ nullable: true })
  price?: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}
