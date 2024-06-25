import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserSessionService } from 'src/services/session.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserAuthController } from './user-auth.controller';
import { OtpModule } from 'src/modules/otp/otp.module';
import { PassportModule } from '@nestjs/passport';
import { UserJwtAuthGuard } from './strategies/guards/jwt.guard';
import { UserJwtDeferredAuthGuard } from './strategies/guards/deferred.jwt.guard';
import { UserLocalAuthGuard } from './strategies/guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EmailModule } from 'src/modules/email/email.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.getOrThrow('jwt')}`,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    OtpModule,
    EmailModule,
  ],
  providers: [
    UserAuthService,
    UserSessionService,
    UserJwtAuthGuard,
    JwtStrategy,
    LocalStrategy,
    UserJwtDeferredAuthGuard,
    UserLocalAuthGuard,
  ],
  controllers: [UserAuthController],
})
export class UserAuthModule {}
