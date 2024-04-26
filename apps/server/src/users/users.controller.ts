// import { contract } from 'api-client';
// import { contract } from 'api-client';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { GetAuthPayload } from 'src/auth/auth.decorator';
import { AuthPayload } from 'src/auth/auth.service';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @TsRestHandler(contract.user.create)
  async handler(@GetAuthPayload() payload: AuthPayload) {
    return tsRestHandler(contract.user.create, async ({ body }) => {
      const userCreate = await this.usersService.createUser({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
      });
      
      return { status: 200, body: { success: true } };
    });
  }
}
