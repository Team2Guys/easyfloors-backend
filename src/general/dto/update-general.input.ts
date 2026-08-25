import { CreatedRedirecturls, CreateGeneralInput } from './create-general.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRedirecturls extends PartialType(CreatedRedirecturls) {
  @Field(() => Int)
  id: number;
}


@InputType()
export class UpdateGeneralInput extends PartialType(CreateGeneralInput) {
  @Field(() => String)
  id: string;
}