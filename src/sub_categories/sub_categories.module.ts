import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub_categories.service';
import { SubCategoriesResolver } from './sub_categories.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SubCategoriesResolver, SubCategoriesService],
  imports: [PrismaModule],
})
export class SubCategoriesModule {}
