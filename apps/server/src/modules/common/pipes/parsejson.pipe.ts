import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'object' || value === null) {
      throw new BadRequestException('Expected an object');
    }
    console.log(value, ' type: ', typeof value);
    Logger.debug('Parsing request object');
    try {
      value = JSON.parse(value);
    } catch (err) {
      Logger.debug("couldn't parse");
    }
    console.log('obj test', value.first_name);
    for (const key in value) {
      if (typeof value[key] === 'string') {
        try {
          value[key] = parseJsonStringOrArray(value[key]);
        } catch (error) {
          // Ignore error if parsing fails, it means the string was not JSON
        }
      }
    }
    return value;
  }
}
