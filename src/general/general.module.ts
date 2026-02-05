import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralResolver } from './general.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [GeneralResolver, GeneralService],
  imports: [PrismaModule],
})
export class GeneralModule {}
