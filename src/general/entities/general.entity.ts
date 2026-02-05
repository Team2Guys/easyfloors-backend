import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BlogStatus } from '../../general/dto/enums/enum';

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
