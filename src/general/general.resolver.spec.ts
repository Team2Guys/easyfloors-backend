import { Test, TestingModule } from '@nestjs/testing';
import { GeneralResolver } from './general.resolver';
import { GeneralService } from './general.service';

describe('GeneralResolver', () => {
  let resolver: GeneralResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralResolver, GeneralService],
    }).compile();

    resolver = module.get<GeneralResolver>(GeneralResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
