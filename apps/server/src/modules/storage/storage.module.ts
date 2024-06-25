import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicStorageService } from './public-storage.service';

@Module({
  imports: [ConfigModule],
  providers: [PublicStorageService],
  exports: [PublicStorageService],
})
export class StorageModule {}
