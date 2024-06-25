import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SystemUsersService } from './users.service';
import { SystemUsersController } from './users.controller';
import { EmailModule } from 'src/email/email.module';
import { AuditModule } from 'src/audit/audit.module';
import { AuditTrailService } from 'src/audit/audit-trail/audit-trail.service';

@Module({
  controllers: [SystemUsersController],
  imports: [EmailModule, AuditModule],
  providers: [SystemUsersService, AuditTrailService],
  exports: [SystemUsersService],
})
export class SystemUsersModule  {
 
}
