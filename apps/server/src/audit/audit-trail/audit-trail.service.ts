import { Injectable } from '@nestjs/common';
import { schema } from 'db-schema';
import { InferInsertModel } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { DbTransaction } from 'src/types/misc';

@Injectable()
export class AuditTrailService {
  //   constructor(private drizzleService: DrizzleService) {}

  async logAuditTrail(
    obj: InferInsertModel<typeof schema.audit_trail>,
    txn: DbTransaction,
  ) {
    return (await txn
      .insert(schema.audit_trail)
      .values({ ...obj })
      .returning()).at(0);
  }
}
