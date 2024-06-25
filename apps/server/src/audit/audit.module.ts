import { Module } from '@nestjs/common';
import { AuditTrailService } from './audit-trail/audit-trail.service';

@Module({
  providers: [AuditTrailService],
  exports: [AuditTrailService]
})
export class AuditModule {}
