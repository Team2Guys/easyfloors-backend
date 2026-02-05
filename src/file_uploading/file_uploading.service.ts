import { Injectable } from '@nestjs/common';
import { cloudinary } from './cloudinar.config';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class FileUploadingService {
  async create(file: FileUpload) {
    try {
      console.log(file, 'result');

      const { createReadStream, filename } = file;
      const result: any = await new Promise((resolve, reject) => {
        const stream = createReadStream();
        const upload = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          },
        );
        stream.pipe(upload);
      });

      console.log(result, 'result');
      return { imageUrl: result.secure_url, public_id: result.public_id };
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }

  async delete(publicid: string) {
    try {
      let result = await cloudinary.uploader.destroy(publicid);
      console.log(result, 'result');
      return result.result === 'ok'; // ✅ Return true if successful
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }
}
