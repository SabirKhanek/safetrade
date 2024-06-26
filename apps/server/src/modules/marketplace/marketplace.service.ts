import { Injectable } from '@nestjs/common';
import { ServerInferRequest } from '@ts-rest/core';
import { contract } from 'api-contract';
import { schema } from 'db-schema';
import { DrizzleService } from 'src/drizzle.service';
import { File } from 'src/shared/types/file';
import { PublicStorageService } from '../storage/public-storage.service';

@Injectable({})
export class MarketplaceService {
  constructor(
    private drizzleService: DrizzleService,
    private storageService: PublicStorageService,
  ) {}

  async createOffer(
    {
      category,
      description,
      short_description,
      title,
    }: ServerInferRequest<typeof contract.marketplace.createOffer>['body'],
    attachments: File,
    user_uid: string,
  ) {
    return this.drizzleService.db.transaction(async (txn) => {
      const { uri } = await this.storageService.uploadFile(
        attachments,
        `/offers/${user_uid}/${title.toLowerCase()}`,
        true,
        'thumb.png',
      );
      const _category = await txn
        .insert(schema.product_category)
        .values({ category_name: category })
        .onConflictDoNothing();
      const sell_offer = await txn
        .insert(schema.sell_offer)
        .values({
          category: category,
          title: title,
          attachments: [uri],
          short_description: short_description,
        })
        .returning();
      return sell_offer;
    });
  }
}
