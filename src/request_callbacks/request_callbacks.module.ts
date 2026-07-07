import { Module } from '@nestjs/common';
import { RequestCallbacksService } from './request_callbacks.service';
import { RequestCallbacksResolver } from './request_callbacks.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [RequestCallbacksResolver, RequestCallbacksService],
  imports: [PrismaModule],
})
export class RequestCallbacksModule {}
