import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthPayload as AuthPayloadType } from './auth.service';
export const GetAuthPayload = createParamDecorator<AuthPayloadType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.authpayload;

    return user;
  },
);
