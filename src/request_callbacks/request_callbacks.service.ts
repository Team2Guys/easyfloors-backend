import { Injectable } from '@nestjs/common';
import { CreateRequestCallbackInput } from './dto/create-request-callback.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, sendRequestCallbackEmail } from '../utils/helper';

@Injectable()
export class RequestCallbacksService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestCallbackInput: CreateRequestCallbackInput) {
    try {
      await sendRequestCallbackEmail(createRequestCallbackInput);
      const callback = await this.prisma.requestCallback.create({
        data: createRequestCallbackInput,
      });
      return callback;
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      return this.prisma.requestCallback.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.requestCallback.findUnique({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.requestCallback.delete({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
