import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { File } from 'src/shared/types/file';

@Injectable()
export class ImageOnlyPipe implements PipeTransform {
  transform(file: File): File {

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (file && !allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed',
      );
    }

    return file;
  }
}
