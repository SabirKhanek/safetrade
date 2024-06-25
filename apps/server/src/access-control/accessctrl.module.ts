import { Global, Module } from '@nestjs/common';
import { AccessCtrlService } from './accessctrl.service';
import { AuditModule } from 'src/modules/audit/audit.module';
import { AccessCtrlController } from './accessctrl.controller';
import { SystemUsersModule } from 'src/modules/system-users/users.module';

@Global()
@Module({
  imports: [AuditModule, SystemUsersModule],
  controllers: [AccessCtrlController],
  providers: [AccessCtrlService],
  exports: [AccessCtrlService],
})
export class AccessCtrlModule {}
