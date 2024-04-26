import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayload, AuthService } from './auth.service';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      authpayload?: AuthPayload;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      throw new UnauthorizedException(
        { success: false, reason: 'No token provided' },
        { cause: 'Authorization token was not provided' },
      );

    const userPayload = await this.authService.validateAuthToken(
      req.headers.authorization,
    );
    req.authpayload = userPayload;
    next();
  }
}
