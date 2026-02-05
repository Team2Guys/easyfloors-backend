import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GeneralService } from './general.service';
import { Redirecturls } from './entities/general.entity';
import { CreatedRedirecturls } from './dto/create-general.input';
import { UpdateRedirecturls } from './dto/update-general.input';
import { Public } from 'decorators/public.decorator';

@Resolver(() => Redirecturls)
export class GeneralResolver {
  constructor(private readonly generalService: GeneralService) {}

  @Mutation(() => Redirecturls, { nullable: true })
  createRedirecturls(
    @Args('CreatedRedirecturls') CreatedRedirecturls: CreatedRedirecturls,
  ) {
    return this.generalService.createRedirecturls(CreatedRedirecturls);
  }

  @Mutation(() => Redirecturls, { nullable: true })
  updateRedirecturls(
    @Args('UpdateRedirecturls') UpdateRedirecturls: UpdateRedirecturls,
  ) {
    return this.generalService.updateRedirecturls(UpdateRedirecturls);
  }

  @Public()
  @Mutation(() => Redirecturls, { nullable: true })
  findOneRedirecturls(@Args('url', { type: () => String }) url: string) {
    return this.generalService.findOneRedirecturls(url);
  }

  @Public()
  @Query(() => [Redirecturls], { nullable: true })
  findAllRedirecturls() {
    return this.generalService.findAllRedirecturls();
  }
}
