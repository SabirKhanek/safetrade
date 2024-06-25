import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Groups, Permissions, areSetsEqual } from 'common';
import { AccessCtrlService } from 'src/access-control/accessctrl.service';

@Injectable()
export class InitPermissions implements OnApplicationBootstrap {
  constructor(
    private permissionService: AccessCtrlService,
    private configService: ConfigService,
  ) {}
  async onApplicationBootstrap() {
    const actor = this.configService.getOrThrow('root_uid');
    const root_user_group = Groups.RootGroup;
    const permissions = new Set(Object.values(Permissions));
    const groups = new Set(Object.values(Groups));

    const available =
      await this.permissionService.getGroupPermissions(root_user_group);
    let shouldCreate = false;
    const root_permissions = available.get(root_user_group);
    if (!areSetsEqual(root_permissions, permissions)) shouldCreate = true;
    if (shouldCreate) {
      await this.permissionService.addGroups(actor, groups);
      await this.permissionService.addPermissions(actor, permissions);
      await this.permissionService.addPermissionsInGroup(
        actor,
        root_user_group,
        permissions,
      );
    }
  }
}
