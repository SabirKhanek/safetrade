import { Global, Module } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle.service';
@Global()
@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DBModule {}
