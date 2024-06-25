import { Injectable, Logger } from '@nestjs/common';
import { UserShortInfoType, isValidUUID } from 'common';
import { schema } from 'db-schema';
import { InferInsertModel, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { DbTransaction } from 'src/shared/types/misc';

@Injectable()
export class AuditTrailService {
  constructor(private drizzleService: DrizzleService) {}
  private logger = new Logger(AuditTrailService.name);
  async getUserFromTrailId(
    trail_id: string[],
    user_email?: string,
    take = 10000,
    skip = 0,
  ) {
    // Filter out invalid UUIDs from the trail_id array
    trail_id = trail_id.filter((t) => isValidUUID(t));

    // Log the parameters for debugging
    this.logger.debug(
      `Preparing to fetch log details with params: trail_ids[${trail_id}] and email[${user_email}]`,
    );

    // Construct the common where clause conditions
    const conditions = or(
      trail_id.length > 0
        ? inArray(schema.audit_trail.log_id, trail_id)
        : undefined,
      user_email
        ? ilike(schema.system_user.email, `%${user_email || ''}%`)
        : undefined,
    );

    // Fetch the total count of matching rows
    const [countQuery] = await this.drizzleService.db
      .select({ count: sql`COUNT(*)` })
      .from(schema.audit_trail)
      .innerJoin(
        schema.system_user,
        eq(schema.audit_trail.performed_by, schema.system_user.uid),
      )
      .where(conditions)
  

    const totalCount = countQuery.count;

    // Fetch the trail data with pagination
    const trails = await this.drizzleService.db
      .select()
      .from(schema.audit_trail)
      .innerJoin(
        schema.system_user,
        eq(schema.audit_trail.performed_by, schema.system_user.uid),
      )
      .where(conditions)
      .orderBy(desc(schema.audit_trail.created_at))
      .limit(take)
      .offset(skip);

    this.logger.debug(`Fetched ${trails.length} rows!`);

    // Map the trail data to the desired output format
    const trailObjs = trails.map((t) => {
      const { audit_trail, system_user } = t;
      return {
        performer: {
          avatar: system_user.avatar,
          email: system_user.email,
          first_name: system_user.first_name,
          last_name: system_user.last_name,
          user_uid: system_user.uid,
        } satisfies UserShortInfoType,
        performed_at: audit_trail.created_at,
        action_name: audit_trail.activity_name,
        trail_id: audit_trail.log_id,
        metadata: audit_trail.activity_data,
      };
    });

    this.logger.debug('Returning trail objects with count');

    // Return the trail objects along with the total count
    return {
      totalCount,
      trails: trailObjs,
    };
  }

  async logAuditTrail(
    obj: InferInsertModel<typeof schema.audit_trail>,
    txn: DbTransaction,
  ) {
    return (
      await txn
        .insert(schema.audit_trail)
        .values({ ...obj })
        .returning()
    ).at(0);
  }
}
