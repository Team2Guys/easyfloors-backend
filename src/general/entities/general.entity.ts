import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BlogStatus } from '../../general/dto/enums/enum';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Redirecturls {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => String)
  redirectedUrl: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}

@ObjectType()
export class General {
  @Field(() => ID)
  id: number;

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

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
