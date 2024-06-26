import {
  Controller,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { UserJwtAuthGuard } from '../user-auth/strategies/guards/jwt.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageConvertService } from '../common/services/imageconvert.service';
import { MarketplaceService } from './marketplace.service';
import { File } from 'src/shared/types/file';

@Controller({})
export class MarketPlaceController {
  constructor(
    private imageService: ImageConvertService,
    private marketService: MarketplaceService,
  ) {}
  @TsRestHandler(contract.marketplace.createOffer)
  @UseInterceptors(FileInterceptor('attachments', { limits: {} }))
  @UseGuards(UserJwtAuthGuard)
  async createOfferHandler(
    @Req() req: Request,
    @UploadedFile() attachments: File,
  ) {
    return tsRestHandler(contract.marketplace.createOffer, async ({ body }) => {
      const image = await this.imageService.convertToPng(attachments);
      const res = await this.marketService.createOffer(
        { ...body },
        image,
        req.user.user_uid,
      );
      return { status: 200, body: { success: true, body: res } };
    });
  }
}
