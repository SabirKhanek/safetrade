import { AuditTrailService } from '../modules/audit/audit-trail/audit-trail.service';
import { Injectable } from '@nestjs/common';
import { GroupsType, PermissionsType } from './accessctrl.type';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from 'db-schema';
import { InferInsertModel, SQL, and, eq, ilike, like, or } from 'drizzle-orm';
import * as dbschema from 'db-schema';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { DbTransaction } from 'src/shared/types/misc';
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

  async getGroupPermissions(query: string) {
    const res = await this.drizzleService.db
      .select({
        group_id: schema.role_group.group_id,
        permission: schema.system_permission_control.permission,
      })
      .from(schema.role_group)
      .leftJoin(
        schema.system_permission_control,
        eq(
          schema.system_permission_control.group_id,
          schema.role_group.group_id,
        ),
      )
      .where(ilike(schema.role_group.group_id, `%${query || ''}%`));

    const objMap = new Map<GroupsType, Set<PermissionsType>>();
    res.forEach((v) => {
      if (objMap.has(v.group_id as GroupsType)) {
        if (v.permission)
          objMap
            .get(v.group_id as GroupsType)
            .add(v.permission as PermissionsType);
      } else {
        objMap.set(
          v.group_id as GroupsType,
          new Set<PermissionsType>(
            v.permission ? ([v.permission] as PermissionsType[]) : [],
          ),
        );
      }
    });
    return objMap;
  }

  async getUserPermissions(query: string) {
    const res = await this.drizzleService.db
      .select()
      .from(schema.system_permission_control)
      .innerJoin(
        schema.system_user,
        eq(schema.system_permission_control.system_uid, schema.system_user.uid),
      )
      .where(
        or(
          ilike(schema.system_user.first_name, `%${query}%`),
          ilike(schema.system_user.email, `%${query}%`),
        ),
      );
    const user_perms = res.map((r) => ({
      ...r.system_permission_control,
      user_uid: r.system_user.uid,
      user_f_name: r.system_user.first_name,
      user_email: r.system_user.email,
    }));
    return user_perms;
  }

  async addPermissionsInGroup(
    actor_uid: string,
    group: GroupsType,
    permissions_set: Set<PermissionsType>,
    update = false,
  ) {
    const permissions = Array.from(permissions_set);

    return await this.drizzleService.db.transaction(async (txn) => {
      const logTrail = await this.auditTrailService.logAuditTrail(
        {
          performed_by: actor_uid,
          activity_name: 'Updated group permissions',
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
      if (update) {
        await txn
          .delete(schema.system_permission_control)
          .where(eq(schema.system_permission_control.group_id, group));
      }
      return await txn
        .insert(schema.system_permission_control)
        .values(permissionsInsertObj)
        .onConflictDoNothing()
        .returning();
    });
  }

  async addUsersPermissions(
    actor_uid: string,
    user_uid: string,
    permissions_set: Set<PermissionsType>,
    txn: DbTransaction,
    update = false,
  ) {
    const permissions = Array.from(permissions_set);

    await this.drizzleService.db.transaction(async (_txn) => {
      txn = txn || _txn;
      const logTrail = await this.auditTrailService.logAuditTrail(
        {
          performed_by: actor_uid,
          activity_name: 'Updated user permissions',
          activity_data: { permissions, user_uid },
        },
        txn,
      );
      const permissionsInsertObj: InferInsertModel<
        typeof schema.system_permission_control
      >[] = Array.from(permissions).map((v) => ({
        permission: v,
        system_uid: user_uid,
        audit_trail_logs: logTrail.log_id,
      }));
      if (update) {
        await txn
          .delete(schema.system_permission_control)
          .where(eq(schema.system_permission_control.system_uid, user_uid));
      }
      return await txn
        .insert(schema.system_permission_control)
        .values(permissionsInsertObj)
        .onConflictDoNothing()
        .returning();
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
