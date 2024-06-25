import { Controller, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { SystemAuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/guards/local.guard';
import { Request, Response } from 'express';
import { SystemJwtAuthGuard } from './strategies/guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { SystemUsersService } from 'src/modules/system-users/users.service';
import { SystemUserSessionService } from 'src/services/session.service';
import { Cookies, PermissionsType, SystemAuthPayload } from 'common';
import { JwtService } from '@nestjs/jwt';
import { InjectSystemUser } from './auth.decorator';
import configuration from 'src/config/configuration';
// TODO: Interceptor to clear cookies in 401
@Controller()
export class SystemAuthController {
  constructor(
    private authService: SystemAuthService,
    private configService: ConfigService,
    private userService: SystemUsersService,
    private sessionService: SystemUserSessionService,
    private jwtService: JwtService,
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
        domain: process.env.ROOT_DOMAIN,
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
      res.clearCookie(Cookies.SystemAuthCookie, {
        domain: process.env.ROOT_DOMAIN,
      });
      await this.sessionService.signOutSession(req.systemUser.session_id);
      return { status: HttpStatus.OK, body: { success: true } };
    });
  }

  @UseGuards(SystemJwtAuthGuard)
  @TsRestHandler(contract.system_auth.getAuthUser)
  async getAuthUser(
    @Req() req: Request,
    @InjectSystemUser() _user: SystemAuthPayload,
  ) {
    return tsRestHandler(contract.system_auth.getAuthUser, async () => {
      const user = await this.userService.getUser(req.systemUser.email);

      const obj = {
        ...user,
        created_at: user.created_at.toISOString(),
        updated_at: user.updated_at.toISOString(),
        permissions: user.permissions as PermissionsType[],
        authState: _user,
      };
      const token = this.jwtService.sign(obj);
      return { status: 200, body: { success: true, user: obj, token } };
    });
  }
}
