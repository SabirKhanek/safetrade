import { Module } from '@nestjs/common';
import { AuditTrailService } from './audit-trail/audit-trail.service';
import { AuditTrailController } from './audit-trail/audit-trail.cotroller';

@Module({
  providers: [AuditTrailService],
  controllers: [AuditTrailController],
  exports: [AuditTrailService],
})
export class AuditModule {}
