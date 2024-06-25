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
export class UserJwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(UserJwtAuthGuard.name);
  handleRequest(err, user, info, context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    if (user) {
      req.user = user;
    }
    this.logger.debug('checking if auth is deferred');
    if (req.user.deferred) {
      this.logger.debug(`Authentication rejected because of auth is deferred`);
      throw new UnauthorizedException(
        `User session is deferred! hint: complete auth challenges before proceeding`,
      );
    }
    if (err) {
      const res: Response = context.switchToHttp().getResponse();
      res.clearCookie(Cookies.UserAuthCookie);
      throw new UnauthorizedException();
    }
    return user;
  }
}
