import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user email' })
  password: string;

  @Field(() => String, { description: 'user name' })
  name: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => GraphQLJSON, { nullable: true })
  userImageUrl: string;
}

@InputType()
export class UserLogin {
  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user email' })
  password: string;
}
