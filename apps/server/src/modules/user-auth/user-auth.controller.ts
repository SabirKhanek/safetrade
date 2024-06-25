import {
  Controller,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { Cookies, UserAuthChallenge } from 'common';
import { Request, Response } from 'express';
import configuration from 'src/config/configuration';
import { OtpGuard } from 'src/modules/otp/otp.guard';
import { UserSessionService } from 'src/services/session.service';
import { UsersService } from 'src/modules/users/users.service';
import { UserAuthService } from './user-auth.service';
import { ConfigService } from '@nestjs/config';
import { UserLocalAuthGuard } from './strategies/guards/local.guard';
import { UserJwtDeferredAuthGuard } from './strategies/guards/deferred.jwt.guard';
import { UserJwtAuthGuard } from './strategies/guards/jwt.guard';
import { OtpService } from 'src/modules/otp/otp.service';

@Controller()
export class UserAuthController {
  logger = new Logger(UserAuthController.name);
  constructor(
    private userService: UsersService,
    private sessionService: UserSessionService,
    private authService: UserAuthService,
    private configService: ConfigService,
    private otpService: OtpService,
  ) {}

  @TsRestHandler(contract.auth.signup)
  @UseGuards(OtpGuard)
  async signup(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.signup, async ({ body }) => {
      const user = await this.userService.createUser({
        dob: new Date(body.dob),
        email: body.email,
        first_name: body.f_name,
        last_name: body.l_name,
        password: body.password,
        is_verified: true,
      });
      const ip = configuration().development
        ? '182.181.136.138'
        : req.headers['x-forwarded-for'] || req.ip;
      const userAgent = req.headers['user-agent'];
      const session = await this.sessionService.initiateSession(user.uid, {
        ip_address: ip as string,
        useragent: userAgent,
      });
      const authPayload = await this.authService.generateAuthPayload(
        session.session_id,
      );
      const signedAuthPayload = this.authService.signPayload(authPayload);
      res.cookie(Cookies.UserAuthCookie, signedAuthPayload, {
        httpOnly: true,
        domain: this.configService.getOrThrow('domain'),
        expires: new Date(authPayload.exp),
      });
      return {
        status: 200,
        body: {
          success: true,
          message: 'user created',
          token: signedAuthPayload,
        },
      };
    });
  }

  @TsRestHandler(contract.auth.login)
  @UseGuards(UserLocalAuthGuard)
  async handler(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      const token = this.authService.signPayload(req.user);
      res.cookie(Cookies.UserAuthCookie, token, {
        httpOnly: true,
        domain: this.configService.getOrThrow('domain'),
        expires: new Date(req.user.exp),
      });
      return { status: HttpStatus.OK, body: { token: token } };
    });
  }

  @TsRestHandler(contract.auth.completeChallenge)
  @UseGuards(OtpGuard, UserJwtDeferredAuthGuard)
  async completeChallenge(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // TODO: Change when add authenticator
    return tsRestHandler(contract.auth.completeChallenge, async () => {
      this.logger.debug('Requesting session service to undeffer session');
      this.logger.debug('using default otp challenge');
      this.logger.debug(UserAuthChallenge.TwoFactorOtp);

      const updatedSession = await this.sessionService.undefferSession(
        req.user.session_id,
        UserAuthChallenge.TwoFactorOtp,
      );
      this.logger.debug('requesting auth service to generate auth payload');
      const payload = await this.authService.generateAuthPayload(
        updatedSession.session_id,
        updatedSession,
      );
      const token = this.authService.signPayload(payload);

      this.logger.debug('setting auth cookie');
      res.cookie(Cookies.UserAuthCookie, token, {
        httpOnly: true,
        domain: this.configService.getOrThrow('domain'),
        expires: new Date(req.user.exp),
      });

      return {
        status: 200,
        body: { success: true, message: 'success', token },
      };
    });
  }

  @TsRestHandler(contract.auth.test)
  @UseGuards(UserJwtDeferredAuthGuard)
  async deferredHandler() {
    return tsRestHandler(contract.auth.test, async () => {
      return { status: 200, body: { success: true } };
    });
  }

  @TsRestHandler(contract.auth.testdeferred)
  @UseGuards(UserJwtAuthGuard)
  async testHandler() {
    return tsRestHandler(contract.auth.testdeferred, async () => {
      return { status: 200, body: { success: true } };
    });
  }
}
