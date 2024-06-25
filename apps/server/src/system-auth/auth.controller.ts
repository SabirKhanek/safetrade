import { Controller, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { SystemAuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/guards/local.guard';
import { Request, Response } from 'express';
import { SystemJwtAuthGuard } from './strategies/guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { SystemUsersService } from 'src/system-users/users.service';
import { SystemUserSessionService } from 'src/services/session.service';
import { Cookies } from 'common';
// TODO: Interceptor to clear cookies in 401
@Controller()
export class SystemAuthController {
  constructor(
    private authService: SystemAuthService,
    private configService: ConfigService,
    private userService: SystemUsersService,
    private sessionService: SystemUserSessionService,
  ) {}
  @TsRestHandler(contract.system_auth.login)
  @UseGuards(LocalAuthGuard)
  async handler(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(contract.system_auth.login, async ({ body }) => {
      const token = await this.authService.signAuthPayload(req.systemUser);

      res.cookie(Cookies.SystemAuthCookie, token, {
        httpOnly: true,
        domain: this.configService.getOrThrow('domain'),
        expires: new Date(req.systemUser.exp),
      });
      return { status: HttpStatus.OK, body: { token: token } };
    });
  }

  @UseGuards(SystemJwtAuthGuard)
  @TsRestHandler(contract.system_auth.logout)
  async logoutHandler(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return tsRestHandler(contract.system_auth.logout, async () => {
      res.clearCookie(Cookies.SystemAuthCookie);
      await this.sessionService.signOutSession(req.systemUser.session_id);
      return { status: HttpStatus.OK, body: { success: true } };
    });
  }

  @UseGuards(SystemJwtAuthGuard)
  @TsRestHandler(contract.system_auth.getAuthUser)
  async getAuthUser(@Req() req: Request) {
    return tsRestHandler(contract.system_auth.getAuthUser, async () => {
      // const token = headers.authorization;
      // await this.authService.validateAuthToken(token);

      const user = await this.userService.getUser(req.systemUser.email);
      return { status: 200, body: { success: true, user } };
    });
  }
}
