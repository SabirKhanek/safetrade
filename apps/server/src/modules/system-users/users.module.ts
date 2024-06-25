import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SystemUsersService } from './users.service';
import { SystemUsersController } from './users.controller';
import { EmailModule } from 'src/modules/email/email.module';
import { AuditModule } from 'src/modules/audit/audit.module';
import { AuditTrailService } from 'src/modules/audit/audit-trail/audit-trail.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  controllers: [SystemUsersController],
  imports: [EmailModule, AuditModule, StorageModule],
  providers: [SystemUsersService, AuditTrailService],
  exports: [SystemUsersService],
})
export class SystemUsersModule {}
