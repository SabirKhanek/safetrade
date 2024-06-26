import { Module } from '@nestjs/common';
import { MarketPlaceController } from './marketplace.controller';
import { StorageModule } from '../storage/storage.module';
import { MarketplaceService } from './marketplace.service';

@Module({
  controllers: [MarketPlaceController],
  imports: [StorageModule],
  providers: [MarketplaceService],
})
export class MarketPlaceModule {}
