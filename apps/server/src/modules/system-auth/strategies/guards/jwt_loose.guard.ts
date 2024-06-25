import {
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class SystemJwtLooseAuthGuard extends AuthGuard('system-jwt') {
  private logger = new Logger(SystemJwtLooseAuthGuard.name);
  handleRequest(err, user, info, context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    if (user) {
      req.systemUser = user;
      this.logger.debug(`Authenticated user: ${req.systemUser.email}`);
    }
    if (err || !req.systemUser) {
      this.logger.debug('Authentication failed: No user attached!');
    }
    return user;
  }
}
