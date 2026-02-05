import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      return await this.prisma.products.create({
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
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      console.log('working ');
      return await this.prisma.products.findMany({
        include: { category: true, subcategory: true, acessories: true },
      });
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
      let flag = acessories ? true : false;
      return await this.prisma.products.findFirst({
        where: {
          custom_url,
          category: {
            RecallUrl: category,
          },
          subcategory: {
            custom_url: subCategory,
          },
        },
        include: {
          category: true,
          subcategory: true,
          acessories: flag ? true : false,
        },
      });
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
      console.log(updateData, 'updateProductInput');
      let updatedAt = new Date();
      return await this.prisma.products.update({
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
      return await this.prisma.products.delete({ where: { id } });
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
