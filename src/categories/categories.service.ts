import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { customHttpException } from '../utils/helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const { name } = createCategoryInput;

      let AlreadyExistedProduct = await this.prisma.category.findUnique({
        where: { name },
      });

      if (AlreadyExistedProduct)
        return customHttpException('Category Already Exist', 'BAD_REQUEST');

      let response = await this.prisma.category.create({
        data: { ...createCategoryInput, last_editedBy: 'Admin' },
      });
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw {
        status: 'error',
        message: `Error fetchin: ${error.message}`,
        stack: error.stack,
      };
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: {
          subcategories: true,
          recalledSubCats: {
            include: {
              category: true,
            },
          },
          accessories: true,
          products: {
            include: {
              subcategory: true,
              category: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(customUrl: string, accessoryFlag?: boolean) {
    try {
      let flag = accessoryFlag ? true : false;
      return await this.prisma.category.findFirst({
        where: { custom_url: customUrl },
        include: { accessories: flag ? true : false },
      });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    try {
      const email = 'Admin';
      let updateDate = new Date();

      let category = await this.prisma.category.findUnique({
        where: { id: id },
      });

      if (!category)
        return customHttpException('Category not found', 'NOT_FOUND');
      const updatedCategory = await this.prisma.category.update({
        where: { id: id },
        data: {
          ...updateCategoryInput,
          last_editedBy: email,
          updatedAt: updateDate,
        },
      });
      console.log(updatedCategory, 'updatedCategory');

      return updatedCategory;
    } catch (error) {
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async remove(id: number) {
    try {
      console.log(id, 'id', typeof id);

      const category = await this.prisma.category.findUnique({
        where: { id: id },
      });

      if (!category) {
        return customHttpException('Category not found', 'NOT_FOUND');
      }

      let response = await this.prisma.category.delete({
        where: { id: id },
      });

      console.log(response, 'response');
      return response;
    } catch (error) {
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
