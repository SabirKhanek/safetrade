import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { schema } from 'db-schema';
import { eq, inArray, not } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { EmailService } from 'src/modules/email/email.service';

@Injectable({})
export class OtpService {
  constructor(
    private emailService: EmailService,
    private drizzleService: DrizzleService,
  ) {}

  async initOtpSession(email: string) {
    return await this.drizzleService.db.transaction(async (txn) => {
      const otp = (
        await txn
          .insert(schema.otp)
          .values({ otp: this.generateOtp(6) })
          .returning({ id: schema.otp.id, code: schema.otp.otp })
      ).at(0);
      const otp_verification = (
        await txn
          .insert(schema.otp_verification)
          .values({ email, active_otp: otp.id, otps: [otp.id] })
          .returning({ id: schema.otp_verification.id })
      ).at(0);
      try {
        await this.emailService.sendMail(email, {
          template: 'otp',
          templateArgs: { otp: otp.code },
          subject: 'OTP verification | Safetrade',
        });
        return { otp_session_id: otp_verification.id, emailSent: true };
      } catch (err) {
        console.log(err.message);
        txn.rollback();
        throw new InternalServerErrorException("couldn't send otp");
      }
    });
  }

  async resendOtp(otp_session_id: string) {
    await this.drizzleService.db.transaction(async (txn) => {
      const otpSession = (
        await txn
          .select()
          .from(schema.otp_verification)
          .where(eq(schema.otp_verification.id, otp_session_id))
      ).at(0);

      if (!otpSession) {
        throw new InternalServerErrorException('OTP session not found');
      }

      await txn
        .update(schema.otp)
        .set({ status: 'expired' })
        .where(eq(schema.otp.id, otpSession.active_otp));

      const newOtp = (
        await txn
          .insert(schema.otp)
          .values({ otp: this.generateOtp(6) })
          .returning({ id: schema.otp.id, code: schema.otp.otp })
      ).at(0);

      const updatedOtps = [...otpSession.otps, newOtp.id];

      await txn
        .update(schema.otp_verification)
        .set({ active_otp: newOtp.id, otps: updatedOtps })
        .where(eq(schema.otp_verification.id, otp_session_id));

      try {
        await this.emailService.sendMail(otpSession.email, {
          template: 'otp',
          templateArgs: { otp: newOtp.code },
          subject: 'OTP verification | Safetrade',
        });
        return { otp_session_id: otp_session_id, emailSent: true };
      } catch (err) {
        txn.rollback();
        throw new InternalServerErrorException("couldn't send otp");
      }
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteNonActiveOtpVerifications() {
    await this.drizzleService.db.transaction(async (txn) => {
      const nonActiveOtpVerifications = await txn
        .select()
        .from(schema.otp_verification)
        .where(not(eq(schema.otp_verification.status, 'active')));

      const otpIdsToDelete = nonActiveOtpVerifications.flatMap(
        (otpVerification) => otpVerification.otps,
      );

      await txn
        .delete(schema.otp_verification)
        .where(not(eq(schema.otp_verification.status, 'active')));

      if (otpIdsToDelete.length > 0) {
        await txn
          .delete(schema.otp)
          .where(inArray(schema.otp.id, otpIdsToDelete));
      }
    });
  }

  async consumeVerification(otp_session_id: string) {
    return await this.drizzleService.db.transaction(async (txn) => {
      const otpSession = (
        await txn
          .select()
          .from(schema.otp_verification)
          .where(eq(schema.otp_verification.id, otp_session_id))
      ).at(0);

      if (!otpSession) {
        throw new BadRequestException('OTP session not found');
      }

      if (otpSession.status !== 'verified') {
        throw new BadRequestException('OTP session is not verified');
      }

      const otpIdsToDelete = otpSession.otps;
      await txn
        .delete(schema.otp_verification)
        .where(eq(schema.otp_verification.id, otp_session_id));

      if (otpIdsToDelete.length > 0) {
        await txn
          .delete(schema.otp)
          .where(inArray(schema.otp.id, otpIdsToDelete));
      }

      return { deleted: true, otp_session_id: otp_session_id };
    });
  }

  async verifyOtp(otp_session_id: string, otpCode: string) {
    const otpSession = (
      await this.drizzleService.db
        .select()
        .from(schema.otp_verification)
        .innerJoin(
          schema.otp,
          eq(schema.otp.id, schema.otp_verification.active_otp),
        )
        .where(eq(schema.otp_verification.id, otp_session_id))
    ).at(0);

    if (!otpSession) {
      throw new BadRequestException('OTP session not found');
    }

    if (otpSession.otp_ver.status === 'verified') {
      throw new BadRequestException("you trippin'? it's already verified!");
    }

    const currentTime = new Date().getTime();
    const otpCreationTime = new Date(otpSession.otp.created_at).getTime();
    const timeDifference = currentTime - otpCreationTime;

    if (timeDifference > 5 * 60 * 1000) {
      await this.drizzleService.db
        .update(schema.otp)
        .set({ status: 'expired' })
        .where(eq(schema.otp.id, otpSession.otp_ver.active_otp));
      throw new BadRequestException('OTP has expired');
    }

    if (otpSession.otp.otp !== otpCode) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.drizzleService.db
      .update(schema.otp)
      .set({ status: 'used' })
      .where(eq(schema.otp.id, otpSession.otp_ver.active_otp));

    await this.drizzleService.db
      .update(schema.otp_verification)
      .set({ status: 'verified' })
      .where(eq(schema.otp_verification.id, otp_session_id));

    return { verified: true, email: otpSession.otp_ver.email };
  }

  generateOtp(digits: number) {
    const avlbl_digits = '0123456789';
    let otp = '';

    for (let i = 0; i < digits; i++) {
      otp += avlbl_digits[Math.floor(Math.random() * avlbl_digits.length)];
    }
    console.log(otp);
    return otp;
  }
}
