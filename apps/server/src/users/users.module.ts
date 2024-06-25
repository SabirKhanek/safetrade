import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MagiclinkService } from 'src/services/magic-link.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [UsersService, MagiclinkService],
  exports: [UsersService],
})
export class UsersModule {}
