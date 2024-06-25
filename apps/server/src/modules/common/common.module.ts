import { Global, Module } from '@nestjs/common';
import { ImageConvertService } from './services/imageconvert.service';
import { ImageOnlyPipe } from './pipes/image.pipe';
@Global()
@Module({
  providers: [ImageConvertService, ImageOnlyPipe],
  exports: [ImageConvertService, ImageOnlyPipe],
})
export class CommonModule {}
