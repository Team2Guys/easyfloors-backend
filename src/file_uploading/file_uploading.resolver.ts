import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileUploadingService } from './file_uploading.service';
import { FileUploading } from './entities/file_uploading.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateFileUploadingInput } from './dto/update-file_uploading.input';
import { Public } from '../decorators/public.decorator';

@Resolver(() => FileUploading)
export class FileUploadingResolver {
  constructor(private readonly fileUploadingService: FileUploadingService) {}

  @Public()
  @Mutation(() => FileUploading)
  async createFileUploading(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.fileUploadingService.create(file);
  }

  @Public()
  @Mutation(() => Boolean)
  async DeleteImage(
    @Args('RemoveUImage') updatedImageInput: UpdateFileUploadingInput,
  ) {
    return await this.fileUploadingService.delete(updatedImageInput.public_id);
  }
}
