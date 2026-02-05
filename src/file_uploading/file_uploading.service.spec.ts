import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadingService } from './file_uploading.service';

describe('FileUploadingService', () => {
  let service: FileUploadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadingService],
    }).compile();

    service = module.get<FileUploadingService>(FileUploadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
