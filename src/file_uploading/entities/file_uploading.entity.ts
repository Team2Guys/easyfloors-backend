import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FileUploading {
  @Field()
  imageUrl: string; // ✅ Cloudinary URL

  @Field()
  public_id: string; // ✅ Public ID from Cloudinary
}
