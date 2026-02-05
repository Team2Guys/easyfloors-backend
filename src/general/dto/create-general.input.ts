import { InputType, Int, Field } from '@nestjs/graphql';
import { BlogStatus } from './enums/enum';

@InputType()
export class CreatedRedirecturls {
  @Field(() => String)
  url: string;

  @Field(() => String)
  redirectedUrl: string;

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus;
}
