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
  eq,
  sql,
} from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from '../db-schema';
import { generateRandomPassword } from 'src/utils/generateRandomPass';
import { genHash, verifyHash } from 'src/utils/hashing';
import { EmailService } from 'src/email/email.service';
import _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { AuditTrailService } from 'src/audit/audit-trail/audit-trail.service';
import { AccessCtrlService } from 'src/access-control/accessctrl.service';
@Injectable()
export class SystemUsersService {
  private logger = new Logger(SystemUsersService.name);
  private sensitive_props = ['password'];
  constructor(
    private drizzleService: DrizzleService,
    private mailer: EmailService,
    private accessCtrl: AccessCtrlService,
    private auditService: AuditTrailService,
  ) {}

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

  async createUser(
    userObj: {
      first_name: string;
      uid?: string;
      last_name: string;
      email: string;
      role_group?: InferInsertModel<typeof schema.role_group>['group_id'];
    },
    performed_by: string,
    description = '',
  ) {
    const randomPassword = generateRandomPassword(15);
    const randomPasswordHash = genHash(randomPassword);
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
          activity_data: { description },
        },
        txn,
      );
      const new_user = await txn
        .insert(schema.system_user)
        .values({
          ...userObj,
          audit_trail_logs: audit_trail.log_id,
          password_hash: randomPasswordHash,
        })
        .returning();
      return new_user.at(0);
    });

    let emailSent = false;
    try {
      await this.mailer.sendMail(userObj.email, {
        template: 'welcome',
        subject: 'Account credentials for Safetrade',
        templateArgs: {
          first_name: userObj.first_name,
          password: randomPassword,
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
    return _.omit(user, this.sensitive_props);
  }

  async validateUserCredentials(email: string, password: string) {
    const user = await this._getUser(email);
    if (!user) throw new NotFoundException('User not found');
    return verifyHash(password, user.password_hash);
  }
}
