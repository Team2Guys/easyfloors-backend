import { Test, TestingModule } from '@nestjs/testing';
import { AccessoriesResolver } from './accessories.resolver';
import { AccessoriesService } from './accessories.service';

describe('AccessoriesResolver', () => {
  let resolver: AccessoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessoriesResolver, AccessoriesService],
    }).compile();

    resolver = module.get<AccessoriesResolver>(AccessoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
