import { Global, Module } from '@nestjs/common';
import { AccessCtrlService } from './accessctrl.service';
import { AuditModule } from 'src/audit/audit.module';

@Global()
@Module({
  imports: [AuditModule],
  providers: [AccessCtrlService],
  exports: [AccessCtrlService],
})
export class AccessCtrlModule {}
