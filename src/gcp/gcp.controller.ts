import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleMerchantService } from './gcp.service';
import { Public } from '../decorators/public.decorator';

@Controller('google')
export class GoogleController {
  constructor(private readonly GoogleMerchantService: GoogleMerchantService) {}
  @Public()
  @Get()
  testApi() {
    return 'Api is Working';
  }

  @Public()
  @Get('sync-product')
  async syncProduct(@Query('id') id: string) {
    const merchantId = process.env.GOOGLE_MERCHANT_ID || '';
    return this.GoogleMerchantService.uploadProducts(merchantId);
  }

  @Public()
  @Get('sync-UpdateStock')
  async UpdateStock() {
    return this.GoogleMerchantService.UpdateStock();
  }
}
