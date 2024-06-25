import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ParseJsonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (typeof body === 'object' && body !== null) {
      for (const key in body) {
        if (typeof body[key] === 'string') {
          try {
            body[key] = JSON.parse(body[key]);
          } catch (error) {
            // Ignore error if parsing fails, it means the string was not JSON
          }
        }
      }
    }

    next();
  }
}
