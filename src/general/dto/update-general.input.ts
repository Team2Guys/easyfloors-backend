import { CreatedRedirecturls } from './create-general.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRedirecturls extends PartialType(CreatedRedirecturls) {
  @Field(() => Int)
  id: number;
}
