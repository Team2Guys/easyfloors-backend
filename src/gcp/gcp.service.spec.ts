import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMerchantService } from './gcp.service';

describe('GcpService', () => {
  let service: GoogleMerchantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleMerchantService],
    }).compile();

    service = module.get<GoogleMerchantService>(GoogleMerchantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
