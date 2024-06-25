// inject-system-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SystemAuthPayload } from 'common';

export const InjectSystemUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): SystemAuthPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Assuming `user` is the property that holds SystemUser in your request object
  },
);
