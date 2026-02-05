import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubCategoriesService } from './sub_categories.service';
import { SubCategory } from './entities/sub_category.entity';
import { CreateSubCategoryInput } from './dto/create-sub_category.input';
import { UpdateSubCategoryInput } from './dto/update-sub_category.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => SubCategory)
export class SubCategoriesResolver {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Public()
  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    return this.subCategoriesService.create(createSubCategoryInput);
  }

  @Public()
  @Query(() => [SubCategory], { name: 'subCategories' })
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Public()
  @Query(() => SubCategory, { name: 'subCategory' })
  findOne(
    @Args('customUrl', { type: () => String }) customUrl: string,
    @Args('category', { type: () => String }) category: string,
  ) {
    return this.subCategoriesService.findOne(customUrl, category);
  }

  @Mutation(() => SubCategory)
  updateSubCategory(
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: UpdateSubCategoryInput,
  ) {
    return this.subCategoriesService.update(
      updateSubCategoryInput.id,
      updateSubCategoryInput,
    );
  }

  @Mutation(() => SubCategory)
  removeSubCategory(@Args('id', { type: () => Int }) id: number) {
    return this.subCategoriesService.remove(id);
  }
}
