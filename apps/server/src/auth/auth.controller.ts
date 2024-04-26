import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @TsRestHandler(contract.auth.login)
  async handler() {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      const token = await this.authService.authenticate(
        body.email,
        body.password,
      );
      return { status: 200, body: { token: token } };
    });
  }

  @TsRestHandler(contract.auth.validateToken)
  async validateToken() {
    return tsRestHandler(contract.auth.validateToken, async ({ headers }) => {
      const token = headers.authorization;
      await this.authService.validateAuthToken(token);
      return { status: 200, body: { success: true } };
    });
  }
}
