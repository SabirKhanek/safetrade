import { AccessCtrlService } from './accessctrl.service';
import {
  BadRequestException,
  Controller,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { Request } from 'express';
import { SystemJwtAuthGuard } from 'src/modules/system-auth/strategies/guards/jwt.guard';
import { GroupsType, Permissions, PermissionsType } from './accessctrl.type';
import _ from 'lodash';
import { Require } from './require.decorator';
import { AccessCtrlGuard } from './accessctrl.guard';
import { SystemUsersService } from 'src/modules/system-users/users.service';
import configuration from 'src/config/configuration';

@Controller({})
export class AccessCtrlController {
  constructor(
    private accessCtrl: AccessCtrlService,
    private userService: SystemUsersService,
  ) {}

  @TsRestHandler(contract.accessctrl.updatePermissionsInGroup)
  @Require(Permissions.UpdateGroupPermissions)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async updatePermissionsInGroupHandler(@Req() req: Request) {
    return tsRestHandler(
      contract.accessctrl.updatePermissionsInGroup,
      async ({ body }) => {
        if (body.group === configuration().root_user_group) {
          throw new BadRequestException(
            'Root user should have all the permissions',
          );
        }
        const res = await this.accessCtrl.addPermissionsInGroup(
          req.systemUser.user_uid,
          body.group as GroupsType,
          new Set(body.permissions),
          true,
        );
        return {
          status: 200,
          body: {
            message: 'Permissions updated',
            success: true,
            updatedGroup: res,
          },
        };
      },
    );
  }

  @TsRestHandler(contract.accessctrl.updateUserPermissions)
  @Require(Permissions.UpdateUserPermissions) // Specify requirements
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard) // Check for these requirements for authenticated users
  async updateUserPermission(@Req() req: Request) {
    return tsRestHandler(
      contract.accessctrl.updateUserPermissions,
      async ({ body }) => {
        this.accessCtrl.addUsersPermissions(
          req.systemUser.user_uid, // If user is authenticated this property will be attached to req
          body.user_uid,
          new Set(body.permissions),
          undefined,
          true,
        );
        await this.userService.getUser(req.systemUser.email);
        return {
          status: 200,
          body: {
            success: true,
            message: 'User permissions updated',
          },
        };
      },
    );
  }

  @TsRestHandler(contract.accessctrl.getGroupsPermission)
  @Require(Permissions.ReadGroupPermissions)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async getGroupsPermission() {
    return tsRestHandler(
      contract.accessctrl.getGroupsPermission,
      async ({ query }) => {
        const resp = await this.accessCtrl.getGroupPermissions(query.groupName);

        const result = [];

        for (const [group_name, permissionsSet] of resp.entries()) {
          const permissions = Array.from(permissionsSet);
          result.push({ group_name, permissions });
        }
        return {
          status: 200,
          body: { success: true, message: 'success', groups: result },
        };
      },
    );
  }

  @TsRestHandler(contract.accessctrl.getUsersPermissions)
  @Require(Permissions.ReadUserPermissions)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async getUsersPermission() {
    return tsRestHandler(
      contract.accessctrl.getUsersPermissions,
      async ({ query }) => {
        const resp = await this.accessCtrl.getUserPermissions(
          query.user_name_or_email,
        );
        const groupedArray = _.groupBy(resp, 'user_email');

        const result = Object.keys(groupedArray).map((email: GroupsType) => ({
          user_email: email,
          user_f_name: groupedArray[email].at(0).user_f_name,
          user_uid: groupedArray[email].at(0).user_email,
          permissions: groupedArray[email].map(
            (v) => v.permission as PermissionsType,
          ),
        }));

        return {
          status: 200,
          body: { success: true, message: 'success', users: result },
        };
      },
    );
  }
}
