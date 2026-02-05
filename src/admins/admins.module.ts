import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AdminsResolver, AdminsService],
  imports: [PrismaModule],
})
export class AdminsModule {}
