import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatedRedirecturls, CreateGeneralInput } from './dto/create-general.input';
import { customHttpException } from '../utils/helper';
import { UpdateGeneralInput, UpdateRedirecturls } from './dto/update-general.input';

@Injectable()
export class GeneralService {
  constructor(private prisma: PrismaService) {}

  async createRedirecturls(CreatedRedirecturls: CreatedRedirecturls) {
    try {
      return await this.prisma.redirecturls.create({
        data: CreatedRedirecturls,
      });
    } catch (error) {
      customHttpException(error);
    }
  }
  async updateRedirecturls(CreatedRedirecturls: UpdateRedirecturls) {
    try {
      const { id, ...updated } = CreatedRedirecturls;
      if (updated.url) {
        const existing = await this.prisma.redirecturls.findFirst({
          where: {
            url: updated.url,
            NOT: { id: Number(id) },
          },
        });

        if (existing) {
          throw new Error(
            'This URL already exists. Please choose a unique one.',
          );
        }
      }

      return await this.prisma.redirecturls.update({
        where: { id: Number(id) },
        data: { ...updated, updatedAt: new Date() },
      });
    } catch (error) {
      customHttpException(error);
    }
  }

  async findOneRedirecturls(endPoint: string) {
    try {
      let urls = await this.prisma.redirecturls.findUnique({
        where: { url: endPoint.trim() },
      });

      return urls;
    } catch (error) {
      customHttpException(error);
    }
  }

  async findAllRedirecturls() {
    try {
      return await this.prisma.redirecturls.findMany();
    } catch (error) {
      customHttpException(error);
    }
  }

  async deleteRedirecturls(endPoint: string) {
    try {
      return await this.prisma.redirecturls.delete({
        where: { url: endPoint },
      });
    } catch (error) {
      customHttpException(error);
    }
  }








  async create(createGeneralInput: CreateGeneralInput) {
    try {
      return await this.prisma.reviews.create({ data: createGeneralInput });
    } catch (error) {
      customHttpException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.reviews.findMany({});
    } catch (error) {
      customHttpException(error);
    }
  }

  async update(updateGeneralInput: UpdateGeneralInput) {
    try {
      let update = new Date();

      const { id, ...updatedData } = updateGeneralInput;

      return await this.prisma.reviews.update({
        where: { id: Number(id) },
        data: { ...updatedData, updatedAt: update },
      });
    } catch (error) {
      customHttpException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.reviews.delete({ where: { id } });
    } catch (error) {
      customHttpException(error);
    }
    return `This action removes a #${id} general`;
  }




}



