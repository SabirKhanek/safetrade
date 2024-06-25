// permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { PermissionsType } from './accessctrl.type';

export const Require = (...permissions: PermissionsType[]) =>
  SetMetadata('permissions', permissions);
