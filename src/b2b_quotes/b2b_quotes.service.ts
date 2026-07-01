import { Injectable } from '@nestjs/common';
import { CreateB2bQuoteInput } from './dto/create-b2b-quote.input';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, sendB2BQuoteEmail } from '../utils/helper';

@Injectable()
export class B2bQuotesService {
  constructor(private prisma: PrismaService) {}

  async create(createB2bQuoteInput: CreateB2bQuoteInput) {
    try {
      await sendB2BQuoteEmail(createB2bQuoteInput);
      const quote = await this.prisma.b2BQuote.create({
        data: createB2bQuoteInput,
      });
      return quote;
    } catch (error) {
      console.log(error, 'error');
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findAll() {
    try {
      return this.prisma.b2BQuote.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.b2BQuote.findUnique({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.b2BQuote.delete({ where: { id } });
    } catch (error) {
      customHttpException(error, 'INTERNAL_SERVER_ERROR');
    }
  }
}
