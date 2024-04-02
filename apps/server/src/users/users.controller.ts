// import { contract } from 'api-client';
// import { contract } from 'api-client';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @TsRestHandler(contract.user)
  async handler() {
    return tsRestHandler(contract.user, {
      get: async ({ params }) => {
        const { id } = params;
        const u = await this.usersService.getUser(id);
        if (u) {
          return {
            status: 200,
            body: {
              about: u.about,
              username: u.username,
            },
          };
        } else {
          return {
            status: 404,
            body: { details: 'Error' },
          };
        }
      },
      getAll: async (args) => {
        const obj = await this.usersService.getAll();
        return { status: 200, body: obj };
      },
    });
  }
}
