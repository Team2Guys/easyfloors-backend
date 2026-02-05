import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Public()
  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Query(() => Category, { name: 'category' })
  findOne(
    @Args('customUrl', { type: () => String }) customUrl: string,
    @Args('accessoryFlag', { type: () => Boolean, nullable: true })
    accessoryFlag?: boolean,
  ) {
    return this.categoriesService.findOne(customUrl, accessoryFlag);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
