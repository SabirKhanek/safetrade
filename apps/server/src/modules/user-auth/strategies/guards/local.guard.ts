import configuration from 'src/config/configuration';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Cookies } from 'common';

@Injectable()
export class UserLocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (user) {
      req.systemUser = user;
    }
    if (err) {

      const res: Response = context.switchToHttp().getResponse();
      res.clearCookie(Cookies.SystemAuthCookie);
      if (err instanceof BadRequestException)
        throw new BadRequestException(err.message);
      else if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException(err.message);
      } else {
        throw new InternalServerErrorException(
          configuration().development ? err.message : undefined,
        );
      }
    }
    return user;
  }
}
