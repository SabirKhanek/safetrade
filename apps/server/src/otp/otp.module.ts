import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OtpGuard } from './otp.guard';

@Module({
  controllers: [OtpController],
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.getOrThrow('jwt')}`,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OtpService, OtpGuard],
  exports: [OtpService, OtpGuard],
})
export class OtpModule {}
