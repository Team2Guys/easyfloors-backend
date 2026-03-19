import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cache } from '../utils/redis'; // import the Redis/fallback cache

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    const { category, subcategory, acessories, ...updateData } =
      createProductInput;
    try {
      if (!category || !subcategory)
        return customHttpException(
          'categories or sub categories are required',
          'BAD_REQUEST',
        );

      const product = await this.prisma.products.create({
        data: {
          ...updateData,
          ...(category !== undefined
            ? { category: { connect: { id: +category } } }
            : category
              ? { category }
              : undefined),
          ...(subcategory !== undefined
            ? { subcategory: { connect: { id: +subcategory } } }
            : subcategory
              ? { subcategory }
              : undefined),
          ...(acessories !== undefined
            ? { acessories: { connect: { id: +acessories } } }
            : acessories
              ? { acessories }
              : undefined),
        },
      });

      // Invalidate cache after creation
      await cache.del('products:all');

      return product;
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      // Try cache first
      const cached = await cache.get('products:all');
      if (cached) return cached;

      const products = await this.prisma.products.findMany({
        include: { category: true, subcategory: true, acessories: true },
      });

      // Cache the result for 60 seconds
      await cache.set('products:all', products, 60);

      return products;
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(
    custom_url: string,
    category: string,
    subCategory: string,
    acessories?: boolean,
  ) {
    try {
      const cacheKey = `product:${custom_url}:${category}:${subCategory}:${acessories ? 1 : 0}`;
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const flag = !!acessories;
      const product = await this.prisma.products.findFirst({
        where: {
          custom_url,
          category: { RecallUrl: category },
          subcategory: { custom_url: subCategory },
        },
        include: { category: true, subcategory: true, acessories: flag },
      });

      if (product) await cache.set(cacheKey, product, 60);

      return product;
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
      const {
        category,
        subcategory,
        id: _,
        acessories,
        ...updateData
      } = updateProductInput;
      const updatedAt = new Date();

      const product = await this.prisma.products.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt,
          ...(category !== undefined
            ? { category: { connect: { id: +category } } }
            : category
              ? { category }
              : undefined),
          ...(subcategory !== undefined
            ? { subcategory: { connect: { id: +subcategory } } }
            : subcategory
              ? { subcategory }
              : undefined),
          ...(acessories !== undefined
            ? { acessories: { set: { id: +acessories } } }
            : acessories
              ? { acessories }
              : undefined),
        },
      });

      // Invalidate cache after update
      await cache.del('products:all');
      await cache.del(
        `product:${product.custom_url}:${category}:${subcategory}:1`,
      );
      await cache.del(
        `product:${product.custom_url}:${category}:${subcategory}:0`,
      );

      return product;
    } catch (error) {
      console.log(error, 'erro');
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prisma.products.delete({ where: { id } });

      // Invalidate cache after deletion
      await cache.del('products:all');
      await cache.del(
        `product:${product.custom_url}:${product.categoryId}:${product.subCategoryId}:1`,
      );
      await cache.del(
        `product:${product.custom_url}:${product.categoryId}:${product.subCategoryId}:0`,
      );

      return product;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
