import { Global, Module } from '@nestjs/common';
import { SystemAuthController } from './auth.controller';
import { SystemAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SystemUsersModule } from 'src/modules/system-users/users.module';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuditModule } from 'src/modules/audit/audit.module';
import { SystemUserSessionService } from 'src/services/session.service';
import { EmailModule } from 'src/modules/email/email.module';
import { SystemJwtAuthGuard } from './strategies/guards/jwt.guard';
import { LocalAuthGuard } from './strategies/guards/local.guard';
import { SystemJwtLooseAuthGuard } from './strategies/guards/jwt_loose.guard';

@Global()
@Module({
  controllers: [SystemAuthController],
  imports: [
    SystemUsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.getOrThrow('jwt')}`,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    AuditModule,
    EmailModule,
  ],
  providers: [
    SystemAuthService,
    SystemJwtAuthGuard,
    SystemJwtLooseAuthGuard,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    SystemUserSessionService,
  ],
  exports: [SystemAuthService],
})
export class SystemAuthModule {}
