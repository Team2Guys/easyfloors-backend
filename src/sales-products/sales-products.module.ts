import { Module } from '@nestjs/common';
import { SalesProductsService } from './sales-products.service';
import { SalesProductsResolver } from './sales-products.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymobService } from './paymob.service';

@Module({
  providers: [SalesProductsResolver, SalesProductsService, PaymobService],
  imports: [PrismaModule],
})
export class SalesProductsModule {}
