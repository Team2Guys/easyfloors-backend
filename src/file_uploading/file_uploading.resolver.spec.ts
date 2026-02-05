import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadingResolver } from './file_uploading.resolver';
import { FileUploadingService } from './file_uploading.service';

describe('FileUploadingResolver', () => {
  let resolver: FileUploadingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadingResolver, FileUploadingService],
    }).compile();

    resolver = module.get<FileUploadingResolver>(FileUploadingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
