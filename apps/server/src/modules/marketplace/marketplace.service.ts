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
      price,
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
          description: description,
          title: title,
          price: parseInt(price),
          slug: title.toLowerCase() + `_${generateRandomString(5)}`,
          seller_profile: user_uid,
          attachments: [uri],
          short_description: short_description,
        })
        .returning();
      return sell_offer;
    });
  }
}

function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
