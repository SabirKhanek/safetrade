import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import configuration from 'src/config/configuration';
import { extractJwtFromRequest } from './utils/extractJwtFromRequest';
import { SystemAuthService } from '../auth.service';
import { Request } from 'express';
import { SystemUsersService } from 'src/modules/system-users/users.service';
import { PermissionsType } from 'common';
import { SystemUserSessionService } from 'src/services/session.service';
import { SystemAuthPayload } from 'common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'system-jwt') {
  private logger = new Logger(JwtStrategy.name);
  constructor(
    private authService: SystemAuthService,
    private userService: SystemUsersService,
    private sessionService: SystemUserSessionService,
  ) {
    super({
      jwtFromRequest: extractJwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: `${configuration().jwt}`,
      passReqToCallback: true,
      name: 'system-jwt',
    });
  }

  async validate(req: Request, payload: SystemAuthPayload) {
    this.logger.debug('Requesting active session');
    const session = await this.sessionService.updateLastActive(
      payload.session_id,
    );
    this.logger.debug('Got session');
    if (!session) throw new UnauthorizedException();
    const user = await this.userService.getUser(payload.email);
    payload.permissions = user.permissions as PermissionsType[];
    return payload;
  }
}
