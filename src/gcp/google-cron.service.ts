import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleMerchantService } from './gcp.service';

@Injectable()
export class GoogleCronService {
  private readonly logger = new Logger(GoogleCronService.name);

  constructor(private readonly googleMerchantService: GoogleMerchantService) {}

  @Cron('0 0 1,16 * *')
  async handleCron() {
    const merchantId = process.env.GOOGLE_MERCHANT_ID || '';
    this.logger.log('Running cron job to sync products...');
    try {
      await this.googleMerchantService.uploadProducts(merchantId);
      this.logger.log('Product sync successful');
    } catch (err) {
      this.logger.error('Product sync failed', err);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async StokCrone() {
    this.logger.log('Running cron job to sync products...');
    try {
      await this.googleMerchantService.UpdateStock();
      this.logger.log('Product sync successful');
    } catch (err) {
      this.logger.error('Product sync failed', err);
    }
  }
}
