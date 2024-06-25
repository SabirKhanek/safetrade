import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Cookies } from 'common';

@Injectable()
export class SystemJwtAuthGuard extends AuthGuard('system-jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (user) {
      req.systemUser = user;
    }
    if (err) {
      const res: Response = context.switchToHttp().getResponse();
      res.clearCookie(Cookies.SystemAuthCookie);
      throw new UnauthorizedException();
    }
    return user;
  }
}
