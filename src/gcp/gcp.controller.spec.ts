import { Test, TestingModule } from '@nestjs/testing';
import { GoogleController } from './gcp.controller';
import { GoogleMerchantService } from './gcp.service';

describe('GcpController', () => {
  let controller: GoogleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleController],
      providers: [GoogleMerchantService],
    }).compile();

    controller = module.get<GoogleController>(GoogleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
