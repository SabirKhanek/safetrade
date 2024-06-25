import {
  BadRequestException,
  Controller,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { OtpService } from './otp.service';
import { JwtService } from '@nestjs/jwt';
import { OtpGuard } from './otp.guard';

@Controller()
export class OtpController {
  private logger = new Logger(OtpController.name);
  constructor(
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}
  @TsRestHandler(contract.otp.generate)
  async generateOtp() {
    return tsRestHandler(contract.otp.generate, async ({ body }) => {
      const otp_id = (await this.otpService.initOtpSession(body.email))
        .otp_session_id;

      return {
        status: 200,
        body: { success: true, message: 'success', otp_id },
      };
    });
  }

  @TsRestHandler(contract.otp.verify)
  async verifyOtp() {
    return tsRestHandler(contract.otp.verify, async ({ query: params }) => {
      const tokenValidationResult = await this.otpService.verifyOtp(
        params.otp_id,
        params.otp,
      );
      if (!tokenValidationResult.verified) {
        this.logger.debug(`OTP provided was invalid ${params.otp}`);
        throw new BadRequestException('Invalid otp');
      }
      const verified_token = this.jwtService.sign({
        otp_id: params.otp_id,
        email: tokenValidationResult.email,
        exp: Date.now() + OtpGuard.ExpireInterval,
        iat: Date.now(),
      });
      return {
        status: 200,
        body: {
          message: 'success',
          success: true,
          verified_token: verified_token,
        },
      };
    });
  }

  @TsRestHandler(contract.otp.test)
  @UseGuards(OtpGuard)
  async testOtp() {
    return tsRestHandler(contract.otp.test, async ({}) => {
      return { status: 200, body: 'passed' };
    });
  }

  @TsRestHandler(contract.otp.resend)
  async resendOtp() {
    return tsRestHandler(contract.otp.resend, async ({ body }) => {
      const res = await this.otpService.resendOtp(body.otp_id);
      return { status: 200, body: { success: true, message: 'otp sent' } };
    });
  }
}
