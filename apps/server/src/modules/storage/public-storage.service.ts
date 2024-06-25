import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parse } from 'path';
import configuration from 'src/config/configuration';
import { File } from 'src/shared/types/file';

@Injectable()
export class PublicStorageService {
  private bucket: Bucket;
  private storage: Storage;
  private publicUrl_prefix: string;
  private logger = new Logger(PublicStorageService.name);
  constructor(private configService: ConfigService) {
    this.storage = new Storage();
    this.bucket = this.storage.bucket(
      this.configService.getOrThrow('storage_bucket'),
    );
    this.publicUrl_prefix =
      this.configService.get('public_asset_prefix') ||
      `https://storage.googleapis.com/${this.bucket.name}`;
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination
      .replace(/^\.+/g, '')
      .replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private generateFilename(
    uploadedFile: File,
    filename?: string,
    overwrite?: boolean,
  ): string {
    if (filename) {
      return filename
        .replace(/^\.+/g, '')
        .replace(/^\/+/g, '')
        .replace(/\r|\n/g, '_')
        .replace(' ', '-');
    }
    const fileName = parse(uploadedFile.originalname);
    if (overwrite) {
      return `${fileName.name}${fileName.ext}`
        .replace(/^\.+/g, '')
        .replace(/^\/+/g, '')
        .replace(/\r|\n/g, '_')
        .replace(' ', '-');
    } else {
      return `${fileName.name}-${Date.now()}${fileName.ext}`
        .replace(/^\.+/g, '')
        .replace(/^\/+/g, '')
        .replace(/\r|\n/g, '_')
        .replace(' ', '-');
    }
  }

  async uploadFile(
    uploadedFile: File,
    destination: string,
    overwrite: boolean = false,
    filename?: string,
  ) {
    this.logger.debug(
      `Received request to upload a file in ${destination} ${filename ? `with name ${filename}` : ''}`,
    );
    const fileName =
      this.setDestination(destination) +
      this.generateFilename(uploadedFile, filename, overwrite);
    this.logger.debug(`generate full filename: ${fileName}`);
    const file = this.bucket.file(fileName);
    this.logger.debug('Requesting to save the file in google cloud bucket');
    try {
      await file.save(uploadedFile.buffer, {
        contentType: uploadedFile.mimetype,
      });
      this.logger.debug('Saved file in the bucket');
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return {
      storageMetadata: { ...file.metadata },
      uploadedFile,
      uri: fileName,
      publicUrl: `${this.publicUrl_prefix}/${file.name}`,
    };
  }

  static GetPublicUrl(uri: string) {
    if (!uri) return '';
    const asset_prefix = configuration().public_asset_prefix;
    const google_hosted = `https://storage.googleapis.com/${configuration().storage_bucket}/${uri}`;
    return asset_prefix ? `${asset_prefix}/${uri}` : google_hosted;
  }

  async removeFile(uri: string): Promise<void> {
    this.logger.debug(`Deleting ${uri}`);
    const file = this.bucket.file(uri);
    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
