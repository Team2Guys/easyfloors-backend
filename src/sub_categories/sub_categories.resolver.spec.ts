import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriesResolver } from './sub_categories.resolver';
import { SubCategoriesService } from './sub_categories.service';

describe('SubCategoriesResolver', () => {
  let resolver: SubCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoriesResolver, SubCategoriesService],
    }).compile();

    resolver = module.get<SubCategoriesResolver>(SubCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
