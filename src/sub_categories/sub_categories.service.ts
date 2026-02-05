import { Injectable } from '@nestjs/common';
import { CreateSubCategoryInput } from './dto/create-sub_category.input';
import { UpdateSubCategoryInput } from './dto/update-sub_category.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createSubCategoryInput: CreateSubCategoryInput) {
    try {
      const email = 'Admin';
      const { category, recalledByCategories, ...updateData } =
        createSubCategoryInput;

      let response = await this.prisma.subCategories.create({
        data: {
          ...updateData,
          ...(category !== undefined
            ? { category: { connect: { id: Number(category) } } }
            : category
              ? { category }
              : undefined),
          ...(recalledByCategories !== undefined &&
          recalledByCategories.length > 0
            ? {
                recalledByCategories: {
                  connect: recalledByCategories.map((categoryId: number) => ({
                    id: Number(categoryId),
                  })),
                },
              }
            : {}),
          last_editedBy: email,
        },
      });
      return response;
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      let categories = await this.prisma.subCategories.findMany({
        include: { category: true, products: true, recalledByCategories: true },
      });
      return categories;
    } catch (error: any) {
      console.log(error, 'err');
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }
  async findOne(custom_url: string, category: string) {
    try {
      return await this.prisma.subCategories.findFirst({
        where: {
          custom_url,
          category: {
            RecallUrl: category,
          },
        },
        include: { category: true },
      });
    } catch (error) {
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }

  async update(id: number, updateSubCategoryInput: UpdateSubCategoryInput) {
    let updatedAt = new Date();
    try {
      const {
        category,
        id: _,
        recalledByCategories,
        ...updateData
      } = updateSubCategoryInput;

      console.log(id, 'Function Called', updateSubCategoryInput.category);

      return await this.prisma.subCategories.update({
        where: { id },
        data: {
          ...updateData,
          ...(category !== undefined
            ? { category: { connect: { id: Number(category) } } }
            : {}),
          ...(recalledByCategories !== undefined &&
          recalledByCategories.length > 0
            ? {
                recalledByCategories: {
                  set: recalledByCategories.map((categoryId: number) => ({
                    id: Number(categoryId),
                  })),
                },
              }
            : {}),
          updatedAt,
        },
      });
    } catch (error) {
      console.log(error, 'err');
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.subCategories.delete({ where: { id } });
    } catch (error) {
      return customHttpException(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }
}
