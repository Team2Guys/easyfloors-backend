import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GeneralService } from './general.service';
import { General, Redirecturls } from './entities/general.entity';
import { CreatedRedirecturls, CreateGeneralInput } from './dto/create-general.input';
import { UpdateGeneralInput, UpdateRedirecturls } from './dto/update-general.input';
import { Public } from '../decorators/public.decorator';

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



    @Mutation(() => General, { name: "Create_reviews", nullable: true })
  createGeneral(@Args("createGeneralInput") createGeneralInput: CreateGeneralInput) {
    return this.generalService.create(createGeneralInput);
  }

  @Public()
  @Query(() => [General], { name: "get_All_Reviews", nullable: true })
  findAll() {
    return this.generalService.findAll();
  }

  @Mutation(() => General, { name: "update_Reviews" })
  updateGeneral(@Args("updateGeneralInput") updateGeneralInput: UpdateGeneralInput) {
    return this.generalService.update(updateGeneralInput);
  }

  @Mutation(() => General, { name: "Delete_Review", nullable: true })
  removeGeneral(@Args("id", { type: () => Int }) id: number) {
    return this.generalService.remove(id);
  }
}
