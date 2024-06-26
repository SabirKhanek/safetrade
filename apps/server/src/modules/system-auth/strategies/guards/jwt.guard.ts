import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Cookies } from 'common';

@Injectable()
export class SystemJwtAuthGuard extends AuthGuard('system-jwt') {
  private logger = new Logger(SystemJwtAuthGuard.name);
  handleRequest(err, user, info, context: ExecutionContext) {
    this.logger.debug('Auth Guard');
    const req: Request = context.switchToHttp().getRequest();
    if (user) {
      req.systemUser = user;
      this.logger.debug(`Authenticated user: ${req.systemUser.email}`);
    }
    if (err || !req.systemUser) {
      const res: Response = context.switchToHttp().getResponse();
      res.clearCookie(Cookies.SystemAuthCookie, {domain: process.env.ROOT_DOMAIN});
      this.logger.debug('Authentication failed');

      throw new UnauthorizedException();
    }
    return user;
  }
}
