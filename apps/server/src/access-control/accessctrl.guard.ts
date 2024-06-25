// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsType } from './accessctrl.type';
import { Request } from 'express';

@Injectable()
export class AccessCtrlGuard implements CanActivate {
  private logger = new Logger(AccessCtrlGuard.name);
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<PermissionsType[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    this.logger.debug(
      `Permissions required for the action: ${JSON.stringify(requiredPermissions)}`,
    );

    const request: Request = context.switchToHttp().getRequest();
    const user = request.systemUser;
    // Check if user has required permissions
    const hasRequiredPermissions =
      !requiredPermissions ||
      requiredPermissions.every((permission) =>
        user.permissions?.includes(permission),
      );

    return hasRequiredPermissions;
  }
}
