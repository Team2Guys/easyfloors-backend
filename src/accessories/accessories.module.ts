import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesResolver } from './accessories.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AccessoriesResolver, AccessoriesService],
  imports: [PrismaModule],
})
export class AccessoriesModule {}
