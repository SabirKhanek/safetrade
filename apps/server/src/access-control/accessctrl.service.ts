import { AuditTrailService } from '../audit/audit-trail/audit-trail.service';
import { Injectable } from '@nestjs/common';
import { GroupsType, PermissionsType } from './accessctrl.type';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from 'db-schema';
import { InferInsertModel, SQL, and, eq, or } from 'drizzle-orm';

@Injectable()
export class AccessCtrlService {
  constructor(
    private auditTrailService: AuditTrailService,
    private drizzleService: DrizzleService,
  ) {}
  async addPermissions(
    actor_uid: string,
    permissions_set: Set<PermissionsType>,
  ) {
    await this.drizzleService.db.transaction(async (txn) => {
      const permissions = Array.from(permissions_set);
      const audit_trail_log = await this.auditTrailService.logAuditTrail(
        {
          performed_by: actor_uid,
          activity_name: 'Added new permission',
          activity_data: { permissions },
        },
        txn,
      );
      const permissionsObj: InferInsertModel<
        typeof schema.system_permission
      >[] = permissions.map((p) => ({
        permission: p,
        audit_trail_logs: audit_trail_log.log_id,
      }));
      try {
        await txn
          .insert(schema.system_permission)
          .values(permissionsObj)
          .onConflictDoNothing();
      } catch (err) {
        txn.rollback();
      }
    });
  }
  async addGroups(actor_uid: string, groups_set: Set<GroupsType>) {
    const groups = Array.from(groups_set);

    await this.drizzleService.db.transaction(async (txn) => {
      const trail = await this.auditTrailService.logAuditTrail(
        {
          performed_by: actor_uid,
          activity_data: { groups },
          activity_name: 'Added new user group',
        },
        txn,
      );
      const groupsObjs: InferInsertModel<typeof schema.role_group>[] =
        Array.from(groups).map((g) => ({
          group_id: g,
          audit_trail_logs: trail.log_id,
        }));
      try {
        await txn
          .insert(schema.role_group)
          .values(groupsObjs)
          .onConflictDoNothing();
      } catch (err) {
        txn.rollback();
      }
    });
  }

  async addPermissionsInGroup(
    actor_uid: string,
    group: GroupsType,
    permissions_set: Set<PermissionsType>,
  ) {
    const permissions = Array.from(permissions_set);

    await this.drizzleService.db.transaction(async (txn) => {
      const logTrail = await this.auditTrailService.logAuditTrail(
        {
          performed_by: actor_uid,
          activity_name: 'Added permissions in group',
          activity_data: { permissions, group },
        },
        txn,
      );
      const permissionsInsertObj: InferInsertModel<
        typeof schema.system_permission_control
      >[] = Array.from(permissions).map((v) => ({
        permission: v,
        group_id: group,
        audit_trail_logs: logTrail.log_id,
      }));
      const inserted = await txn
        .insert(schema.system_permission_control)
        .values(permissionsInsertObj)
        .onConflictDoNothing().returning();
      
    });
  }

  async getAllowedPermissions(uid?: string, role?: string) {
    const whereUid =
      uid && eq(schema.system_permission_control.system_uid, uid);
    const whereRole =
      role && eq(schema.system_permission_control.group_id, role);
    let where: SQL<unknown>;
    if (whereUid && whereRole) {
      where = or(whereUid, whereRole);
    } else if (whereUid) {
      where = whereUid;
    } else if (whereRole) {
      where = whereRole;
    }
    return (
      await this.drizzleService.db
        .select()
        .from(schema.system_permission_control)
        .where(where)
    ).map((v) => v.permission);
  }
}
