import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Public } from '../decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Public()
  @Query(() => [Product], { name: 'products' })
  findAll(@Context('req') req) {
    console.log(+1, 'request recieved');
    return this.productsService.findAll();
  }

  @Public()
  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('custom_url', { type: () => String }) custom_url: string,
    @Args('category', { type: () => String }) category: string,
    @Args('subCategory', { type: () => String }) subCategory: string,
    @Args('acessories', { type: () => Boolean, nullable: true })
    acessories?: boolean,
  ) {
    return this.productsService.findOne(
      custom_url,
      category,
      subCategory,
      acessories,
    );
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      +updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
