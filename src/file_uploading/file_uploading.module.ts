import { Module } from '@nestjs/common';
import { FileUploadingService } from './file_uploading.service';
import { FileUploadingResolver } from './file_uploading.resolver';

@Module({
  providers: [FileUploadingResolver, FileUploadingService],
})
export class FileUploadingModule {}
