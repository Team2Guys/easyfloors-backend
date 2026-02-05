import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatedRedirecturls } from './dto/create-general.input';
import { customHttpException } from 'utils/helper';
import { UpdateRedirecturls } from './dto/update-general.input';

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

      console.log(endPoint, 'endpoint', urls);
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
}
