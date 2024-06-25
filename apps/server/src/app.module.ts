import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemUsersModule } from './system-users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DrizzleService } from './drizzle.service';
import { SystemAuthModule } from './system-auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { InitRootUser } from './services/warmup/initrootuser.service';
import { DBModule } from './db/db.module';
import { AuditModule } from './audit/audit.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { MagiclinkService } from './services/magic-link.service';
import { ScheduleModule } from '@nestjs/schedule';

import { InitPermissions } from './services/warmup/init_permissions.service';
import { AccessCtrlModule } from './access-control/accessctrl.module';
import { OtpModule } from './otp/otp.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'admin', 'dist'),
      exclude: ['/api/(.*)', '/docs'],
    }),
    SystemUsersModule,
    SystemAuthModule,
    EmailModule,
    DBModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuditModule,
    UserAuthModule,
    AccessCtrlModule,
    OtpModule,
    ScheduleModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.getOrThrow('jwt')}`,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DrizzleService,
    InitRootUser,
    MagiclinkService,
    InitPermissions,
  ],
})
export class AppModule {}
