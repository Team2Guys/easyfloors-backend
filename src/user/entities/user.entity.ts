import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'user ID' })
  id: number;

  @Field(() => String, { description: 'user ID' })
  email: string;

  @Field(() => String, { description: 'user ID' })
  name: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => GraphQLJSON, { nullable: true })
  userImageUrl: string;
}
