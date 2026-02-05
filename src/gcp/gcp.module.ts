import { Module } from '@nestjs/common';
import { GoogleMerchantService } from './gcp.service';
import { GoogleController } from './gcp.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { GoogleAuthModule } from './services/google-auth.module';
import { GoogleCronService } from './google-cron.service';
@Module({
  controllers: [GoogleController],
  providers: [GoogleMerchantService, GoogleCronService],
  imports: [PrismaModule, GoogleAuthModule],
})
export class GcpModule {}
