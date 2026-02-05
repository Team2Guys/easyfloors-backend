import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccessoriesService } from './accessories.service';
import { Accessory } from './entities/accessory.entity';
import { CreateAccessoryInput } from './dto/create-accessory.input';
import { UpdateAccessoryInput } from './dto/update-accessory.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => Accessory)
export class AccessoriesResolver {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Mutation(() => Accessory, { name: 'add_Accessories' })
  createAccessory(
    @Args('createAccessoryInput') createAccessoryInput: CreateAccessoryInput,
  ) {
    return this.accessoriesService.create(createAccessoryInput);
  }
  @Public()
  @Query(() => [Accessory], { name: 'accessories' })
  findAll() {
    return this.accessoriesService.findAll();
  }
  @Public()
  @Query(() => Accessory, { name: 'accessory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accessoriesService.findOne(id);
  }

  @Public()
  @Query(() => Accessory, { name: 'fetchMetatTitle', nullable: true })
  findOneMetatitle(
    @Args('custom_url', { type: () => String }) custom_url: string,
    @Args('category', { type: () => String }) category: string,
  ) {
    return this.accessoriesService.findOneMetatitle(custom_url, category);
  }

  @Mutation(() => Accessory)
  updateAccessory(
    @Args('updateAccessoryInput') updateAccessoryInput: UpdateAccessoryInput,
  ) {
    return this.accessoriesService.update(
      +updateAccessoryInput.id,
      updateAccessoryInput,
    );
  }

  @Mutation(() => Accessory)
  removeAccessory(@Args('id', { type: () => Int }) id: number) {
    return this.accessoriesService.remove(id);
  }
}
