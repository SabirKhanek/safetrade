// import { contract } from 'api-client';
// import { contract } from 'api-client';
import {
  BadRequestException,
  Body,
  Controller,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SystemUsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { InjectSystemUser } from 'src/modules/system-auth/auth.decorator';

import { SystemJwtAuthGuard } from 'src/modules/system-auth/strategies/guards/jwt.guard';
import { Permissions, SystemAuthPayload } from 'common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ImageConvertService } from '../common/services/imageconvert.service';

import { File } from 'src/shared/types/file';
import configuration from 'src/config/configuration';
import { Require } from 'src/access-control/require.decorator';
import { AccessCtrlGuard } from 'src/access-control/accessctrl.guard';
@Controller()
export class SystemUsersController {
  constructor(
    private readonly usersService: SystemUsersService,
    private imageService: ImageConvertService,
  ) {}

  @TsRestHandler(contract.system_user.remove)
  @Require(Permissions.RemoveUser)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async removeUserHandler(@InjectSystemUser() system_user: SystemAuthPayload) {
    return tsRestHandler(contract.system_user.remove, async ({ params }) => {
      if (params.userId === system_user.email) {
        throw new BadRequestException("You can't delete yourself");
      }
      if (params.userId === configuration().email.user) {
        throw new BadRequestException('Root user cannot be deleted!');
      }
      const delete_log = await this.usersService.removeUser(
        params.userId,
        system_user.user_uid,
      );
      return {
        status: 200,
        body: { deleted: true, audit_log: delete_log },
      };
    });
  }

  @TsRestHandler(contract.system_user.create, { validateRequestBody: false })
  @UseInterceptors(FileInterceptor('avatar', { limits: {} }))
  @Require(Permissions.AddUsers)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async handler(
    @InjectSystemUser() payload: SystemAuthPayload,
    @UploadedFile() avatar: File,
    @Body() body: CreateUserDTO,
  ) {
    if (avatar) {
      avatar = await this.imageService.convertToPng(avatar);
    }
    return tsRestHandler(contract.system_user.create, async ({}) => {
      const userCreate = await this.usersService.createUser(
        {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          avatar,
          permissions: body.permissions,
          role_group: body.role_group,
        },
        payload.user_uid,
      );

      return { status: 200, body: { success: true } };
    });
  }

  @TsRestHandler(contract.system_user.searchusers)
  @Require(Permissions.ListUsers)
  @UseGuards(SystemJwtAuthGuard, AccessCtrlGuard)
  async searchHandler(@InjectSystemUser() payload: SystemAuthPayload) {
    return tsRestHandler(
      contract.system_user.searchusers,
      async ({ query }) => {
        const res = await this.usersService.searchAvailableUsers(query);
        return {
          status: 200,
          body: { success: true, message: 'success', data: res },
        };
      },
    );
  }
}
