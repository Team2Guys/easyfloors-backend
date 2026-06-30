import { Module } from '@nestjs/common';
import { B2bQuotesService } from './b2b_quotes.service';
import { B2bQuotesResolver } from './b2b_quotes.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [B2bQuotesResolver, B2bQuotesService],
  imports: [PrismaModule],
})
export class B2bQuotesModule {}
