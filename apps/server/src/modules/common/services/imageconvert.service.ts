import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import  sharp from 'sharp';
import { File } from 'src/shared/types/file';

@Injectable()
export class ImageConvertService {
  private logger = new Logger(ImageConvertService.name)
  async convertToPng(file: File): Promise<File> {
    try {
      const pngBuffer = await sharp(file.buffer).toFormat('png').toBuffer();

      const pngFile: File = {
        ...file,
        originalname: file.originalname.replace(/\.\w+$/, '.png'),
        mimetype: 'image/png',
        buffer: pngBuffer,
      };

      return pngFile;
    } catch (err) {
      this.logger.error(err)
      throw new InternalServerErrorException(
        'Unable to process the image file',
      );
    }
  }
}
