import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Headers, OtpPayload } from 'common';
import { OtpService } from './otp.service';
@Injectable()
export class OtpGuard implements CanActivate {
  private logger = new Logger(OtpGuard.name);
  public static  ExpireInterval = 1000*60 *5; 
  constructor(
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const verified_token = request.headers[Headers.VerfiedOtpToken];
    if (!verified_token) {
      throw new BadRequestException('Need verification for the operation');
    }

    try {
      const otpPayload: OtpPayload = await this.jwtService.verifyAsync(
        verified_token as string,
      );
      this.logger.debug(otpPayload);

      if (otpPayload.exp - otpPayload.iat > OtpGuard.ExpireInterval) {
        this.logger.debug(
          `otp payload is expired ${{ iat: otpPayload.iat, ext: otpPayload.exp }}`,
        );
        throw new BadRequestException('token no longer valid');
      }
      this.logger.debug(otpPayload);
      this.logger.debug('verifying the otp with backend');
      this.logger.debug(
        'result: ',
        await this.otpService.consumeVerification(otpPayload.otp_id),
      );
      request.verifiedOtp = otpPayload;
      return true;
    } catch (err) {
      this.logger.debug(err);
      throw new BadRequestException('Token provided was invalid');
    }
  }
}
