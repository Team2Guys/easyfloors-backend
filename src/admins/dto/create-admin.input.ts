import { InputType, Int, Field } from '@nestjs/graphql';
import { BlogStatus } from 'general/dto/enums/enum';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateAdminInput {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Boolean, { defaultValue: false })
  canAddProduct: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canEditProduct: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canDeleteProduct: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canAddCategory: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canDeleteCategory: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canEditCategory: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canCheckProfit: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canCheckRevenue: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canCheckVisitors: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canViewUsers: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canViewSales: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canVeiwAdmins: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canVeiwTotalproducts: boolean;

  @Field(() => Boolean, { defaultValue: false })
  canVeiwTotalCategories: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  posterImageUrl: any;

  @Field(() => String, { defaultValue: 'Admin' })
  role: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}

@InputType()
export class Admin_login {
  @Field()
  email: string;

  @Field()
  password: string;
}
