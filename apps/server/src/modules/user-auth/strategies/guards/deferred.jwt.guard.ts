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
export class UserJwtDeferredAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(UserJwtDeferredAuthGuard.name);
  handleRequest(err, user, info, context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    if (user) {
      req.user = user;
    }

    if (err) {
      const res: Response = context.switchToHttp().getResponse();
      res.clearCookie(Cookies.UserAuthCookie);
      throw new UnauthorizedException();
    }
    return user;
  }
}
