import { Test, TestingModule } from '@nestjs/testing';
import { SalesProductsResolver } from './sales-products.resolver';
import { SalesProductsService } from './sales-products.service';

describe('SalesProductsResolver', () => {
  let resolver: SalesProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesProductsResolver, SalesProductsService],
    }).compile();

    resolver = module.get<SalesProductsResolver>(SalesProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
