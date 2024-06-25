import { Global, Module } from '@nestjs/common';
import { SystemAuthController } from './auth.controller';
import { SystemAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SystemUsersModule } from 'src/system-users/users.module';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessCtrlService } from '../access-control/accessctrl.service';
import { AuditModule } from 'src/audit/audit.module';
import { SystemUserSessionService } from 'src/services/session.service';
import { EmailModule } from 'src/email/email.module';

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
    LocalStrategy,
    JwtStrategy,
    SystemUserSessionService,
  ],
  exports: [SystemAuthService],
})
export class SystemAuthModule {}
