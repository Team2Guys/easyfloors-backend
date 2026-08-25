import { InputType, Int, Field } from '@nestjs/graphql';
import { BlogStatus } from './enums/enum';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreatedRedirecturls {
  @Field(() => String)
  url: string;

  @Field(() => String)
  redirectedUrl: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}

@InputType()
export class CreateGeneralInput {
  @Field(() => Int)
  starRating: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ReviewsDescription: string;

  @Field(() => String, { nullable: true })
  reviewDate?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  posterImageUrl?: any;
}