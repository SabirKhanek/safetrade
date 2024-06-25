import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  InferColumnsDataTypes,
  InferInsertModel,
  InferSelectModel,
  count,
  eq,
  ilike,
  or,
  sql,
} from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from 'db-schema';
import { generateRandomPassword } from 'src/shared/utils/generateRandomPass';
import { genHash, verifyHash } from 'src/shared/utils/hashing';
import { EmailService } from 'src/modules/email/email.service';
import _ from 'lodash';
import { AuditTrailService } from 'src/modules/audit/audit-trail/audit-trail.service';
import { PermissionsType } from 'common';
import { ServerInferRequest, ServerInferResponseBody } from '@ts-rest/core';
import { contract } from 'api-contract';
import { alias } from 'drizzle-orm/pg-core';
import { File } from 'src/shared/types/file';
import { PublicStorageService } from '../storage/public-storage.service';
import { StorageLocations } from 'src/shared/constants/storage_dests';
import path from 'path';
import { AccessCtrlService } from 'src/access-control/accessctrl.service';
@Injectable()
export class SystemUsersService {
  private logger = new Logger(SystemUsersService.name);
  private sensitive_props = ['password_hash'];
  constructor(
    private drizzleService: DrizzleService,
    private mailer: EmailService,
    private accessCtrl: AccessCtrlService,
    private auditService: AuditTrailService,
    private storageService: PublicStorageService,
  ) {}

  async searchAvailableUsers(
    searchParams: ServerInferRequest<
      typeof contract.system_user.searchusers
    >['query'],
  ) {
    const performer_table = alias(schema.system_user, 'performer');
    const user_table = alias(schema.system_user, 'user');
    const users = await this.drizzleService.db
      .select({
        first_name: user_table.first_name,
        last_name: user_table.last_name,
        avatar: user_table.avatar,
        email: user_table.email,
        joined_on: user_table.created_at,
        performer_name: performer_table.first_name,
        performer_email: performer_table.email,
        performer_avatar: performer_table.avatar,
      })
      .from(user_table)
      .leftJoin(
        schema.audit_trail,
        eq(user_table.audit_trail_logs, schema.audit_trail.log_id),
      )
      .innerJoin(
        performer_table,
        eq(performer_table.uid, schema.audit_trail.performed_by),
      )
      .where(
        or(
          ilike(user_table.email, `%${searchParams.name_email}%`),
          ilike(user_table.first_name, `%${searchParams.name_email}%`),
        ),
      )
      .limit(searchParams.take || 50)
      .offset(searchParams.skip || 0);

    this.logger.debug(users);

    const totalResult = await this.drizzleService.db
      .select({ count: count() })
      .from(schema.system_user)
      .where(
        or(
          ilike(schema.system_user.email, `%${searchParams.name_email}%`),
          ilike(schema.system_user.first_name, `%${searchParams.name_email}%`),
        ),
      );

    return {
      total_available: totalResult.at(0).count,
      users: users.map((u) => ({
        first_name: u.first_name,
        last_name: u.last_name,
        avatar: u.avatar,
        email: u.email,
        joined_on: u.joined_on,
        creator: {
          name: u.performer_name,
          email: u.performer_email,
          avatar: u.avatar,
        },
      })),
    };
  }

  private async _getUser(email: string) {
    // const user = (
    //   await this.drizzleService.db.execute<selectType>(sql`
    //   SELECT
    //       "system_user".*,
    //       COALESCE(json_agg("system_permission_control"."permission"), '[]') AS permissions
    //   FROM
    //       "system_user"
    //   LEFT JOIN
    //       "system_permission_control"
    //   ON
    //       ("system_permission_control"."uid" = "system_user"."uid"
    //       OR
    //       "system_permission_control"."group_id" = "system_user"."role_group")
    //   WHERE
    //     "system_user" = ${email}
    //   GROUP BY
    //       "system_user"."uid"
    // `)
    // ).rows.at(0);
    this.logger.debug(`fetching user[${email}] from database`);
    const user = (
      await this.drizzleService.db
        .select()
        .from(schema.system_user)
        .where(eq(schema.system_user.email, email))
        .limit(1)
    ).at(0);
    if (!user || Object.keys(user).length === 0) return undefined;
    return {
      ...user,
      permissions: await this.accessCtrl.getAllowedPermissions(
        user.uid,
        user.role_group,
      ),
    };
  }

  async removeUser(userId: string, performed_by: string) {
    const user = await this.getUser(userId, { throw: true });
    return await this.drizzleService.db.transaction(async (txn) => {
      const log = await this.auditService.logAuditTrail(
        {
          performed_by: performed_by,
          activity_name: `Delete System User: ${user.email}`,
        },
        txn,
      );
      await txn
        .delete(schema.system_user)
        .where(eq(schema.system_user.uid, user.uid));
      return log.log_id;
    });
  }

  async createUser(
    userObj: {
      first_name: string;
      password?: string;
      uid?: string;
      last_name: string;
      avatar?: File;
      permissions?: PermissionsType[];
      email: string;
      role_group?: InferInsertModel<typeof schema.role_group>['group_id'];
    },
    performed_by: string,
    description = '',
  ) {
    const permissions = new Set(userObj.permissions || []);
    const randomPassword = generateRandomPassword(15);
    const randomPasswordHash = genHash(userObj.password || randomPassword);
    if (await this._getUser(userObj.email))
      throw new ConflictException({
        success: false,
        reason: 'User already exists',
      });
    const newUser = await this.drizzleService.db.transaction(async (txn) => {
      const audit_trail = await this.auditService.logAuditTrail(
        {
          performed_by,
          activity_name: 'System user creation',
          activity_data: {
            description,
            user_details: {
              first_name: userObj.first_name,
              last_name: userObj.last_name,
              email: userObj.email,
              role_group: userObj.role_group,
            },
          },
        },
        txn,
      );

      const [new_user] = await txn
        .insert(schema.system_user)
        .values({
          first_name: userObj.first_name,
          last_name: userObj.last_name,
          email: userObj.email,
          uid: userObj.uid,
          role_group: userObj.role_group,
          audit_trail_logs: audit_trail.log_id,
          password_hash: randomPasswordHash,
        })
        .returning();

      let avatarUri: string;
      if (userObj.avatar) {
        const { uri } = await this.storageService.uploadFile(
          userObj.avatar,
          StorageLocations.SystemAvatars,
          false,
          `${new_user.first_name}_${new_user.uid}${path.parse(userObj.avatar.originalname).ext}`,
        );
        avatarUri = uri;
      }

      if (avatarUri) {
        this.logger.debug('Updating avatar for the user');
        await txn
          .update(schema.system_user)
          .set({ avatar: avatarUri })
          .where(eq(schema.system_user.uid, new_user.uid));
      }

      if (permissions && permissions.size > 0) {
        await this.accessCtrl.addUsersPermissions(
          performed_by,
          new_user.uid,
          permissions,
          txn,
        );
      }

      return { ...new_user };
    });

    let emailSent = false;
    try {
      await this.mailer.sendMail(userObj.email, {
        template: 'welcome',
        subject: 'Account credentials for Safetrade',
        templateArgs: {
          first_name: userObj.first_name,
          password: userObj.password || randomPassword,
        },
      });
      emailSent = true;
    } catch (err) {}
    // TODO : Omit password property
    return { user: newUser.email, notified: emailSent };
  }

  async getUser(email: string, options?: { throw?: boolean }) {
    const user = await this._getUser(email);
    if (!user) {
      if (options?.throw) throw new NotFoundException();
      return;
    }
    return _.omit(user, this.sensitive_props) as Omit<
      typeof user,
      'password_hash'
    >;
  }

  async validateUserCredentials(email: string, password: string) {
    const user = await this._getUser(email);
    if (!user) throw new NotFoundException('User not found');
    return verifyHash(password, user.password_hash);
  }
}
