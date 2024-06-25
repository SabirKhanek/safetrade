import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ImageConvertService } from 'src/modules/common/services/imageconvert.service';
import { Express } from 'express';

@Injectable()
export class ConvertFilePipe implements PipeTransform {
  constructor(
    private imageConvertService: ImageConvertService,
    private readonly fieldName: string,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' || !value) {
      return value;
    }

    const file = value[this.fieldName];

    if (!file || !(file instanceof Object) || !('fieldname' in file)) {
      throw new BadRequestException(
        `Expected file for parameter "${this.fieldName}"`,
      );
    }

    try {
      const convertedFile = await this.imageConvertService.convertToPng(file);
      return {
        ...value,
        [this.fieldName]: convertedFile,
      };
    } catch (err) {
      throw new BadRequestException(`Failed to convert file: ${err.message}`);
    }
  }
}
