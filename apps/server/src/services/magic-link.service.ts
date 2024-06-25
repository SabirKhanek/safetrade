import { Injectable } from '@nestjs/common';
import { schema } from 'db-schema';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { EmailService } from 'src/email/email.service';
import { generateRandomMagicString } from 'src/utils';

@Injectable()
export class MagiclinkService {
  constructor(
    private emailService: EmailService,
    private drizzleService: DrizzleService,
  ) {}
  async sendMagicLink(
    email: string,
    callback_url: string,
    subject = 'Email Verification',
  ) {
    const magiclink = generateRandomMagicString(64);
    callback_url = callback_url + `?magictoken=${magiclink}`;
    const isSent = await this.drizzleService.db.transaction(async (txn) => {
      await txn
        .insert(schema.magiclinks)
        .values({ email, magicstring: magiclink });
      try {
        await this.emailService.sendMail(email, {
          subject,
          template: 'magiclink',
          templateArgs: {
            callback_url: callback_url + `?magictoken=${''}`,
          },
        });
        return true;
      } catch (err: any) {
        txn.rollback();
        return false;
      }
    });
    return isSent;
  }

  async verifyMagicLink(magiclink: string) {
    const link = (
      await this.drizzleService.db
        .select()
        .from(schema.magiclinks)
        .where(eq(schema.magiclinks.magicstring, magiclink))
    ).at(0);
    if (link.used) {
      return { success: false, detail: 'Token was already used' };
    } else if (link.email) {
      return {
        success: true,
        email: link.email,
        detail: 'Token was already used',
      };
    } else {
      return { success: false, detail: 'Invalid magic token' };
    }
  }
}
