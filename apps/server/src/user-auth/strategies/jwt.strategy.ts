import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import configuration from 'src/config/configuration';
import { Request } from 'express';
import { UserSessionService } from 'src/services/session.service';
import { Cookies, UserAuthPayload } from 'common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private sessionService: UserSessionService) {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: `${configuration().jwt}`,
      passReqToCallback: true,
    });
  }

  static extractJwtFromRequest(req: Request): string | null {
    // Check for JWT in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) {
        return token;
      }
    }

    // Check for JWT in cookies
    const token = req.cookies[Cookies.UserAuthCookie];
    if (token) {
      return token;
    }

    // If JWT is not found in either place, return null
    return null;
  }

  async validate(req: Request, payload: UserAuthPayload) {
    const session = await this.sessionService.updateLastActive(
      payload.session_id,
    );
    if (!session) throw new UnauthorizedException();
    return payload;
  }
}
