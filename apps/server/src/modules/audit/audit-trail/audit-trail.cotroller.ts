import { Controller, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { AuditTrailService } from './audit-trail.service';
import { Permissions } from 'common';
import { Require } from 'src/access-control/require.decorator';
import { SystemJwtAuthGuard } from 'src/modules/system-auth/strategies/guards/jwt.guard';
import { AccessCtrlGuard } from 'src/access-control/accessctrl.guard';

@Controller()
export class AuditTrailController {
  constructor(private auditTrailService: AuditTrailService) {}
  @TsRestHandler(contract.audit.getTrailDetails)
  @Require(Permissions.ReadAuditTrails)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async handlerGetAudiTrail() {
    return tsRestHandler(contract.audit.getTrailDetails, async ({ query }) => {
      const trail_details = await this.auditTrailService.getUserFromTrailId(
        query.trail_ids,
        query.user_email,
        query.take,
        query.skip,
      );
      return {
        status: 200,
        body: {
          data: trail_details.trails,
          total_available: trail_details.totalCount as number,
        },
      };
    });
  }
}
