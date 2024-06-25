// import { contract } from 'api-client';
// import { contract } from 'api-client';
import { Controller, UseGuards } from '@nestjs/common';
import { SystemUsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { InjectSystemUser } from 'src/system-auth/auth.decorator';
import { Require } from 'src/access-control/require.decorator';
import { Permissions } from 'src/access-control/accessctrl.type';
import { SystemJwtAuthGuard } from 'src/system-auth/strategies/guards/jwt.guard';
import { AccessCtrlGuard } from 'src/access-control/accessctrl.guard';
import { SystemAuthPayload } from 'common';
@Controller()
export class SystemUsersController {
  constructor(private readonly usersService: SystemUsersService) {}
  @TsRestHandler(contract.system_user.create)
  @Require(Permissions.AddUsers)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async handler(@InjectSystemUser() payload: SystemAuthPayload) {
    return tsRestHandler(contract.system_user.create, async ({ body }) => {
      const userCreate = await this.usersService.createUser(
        {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          role_group: body.role_group,
        },
        payload.user_uid,
      );

      return { status: 200, body: { success: true } };
    });
  }
}
