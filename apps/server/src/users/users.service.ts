import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from '../db-schema';
import { generateRandomPassword } from 'src/utils/generateRandomPass';
import { genHash, verifyHash } from 'src/utils/hashing';
import { EmailService } from 'src/email/email.service';
import _ from 'lodash';
@Injectable()
export class UsersService {
  private sensitive_props = ['password'];
  constructor(
    private drizzleService: DrizzleService,
    private mailer: EmailService,
  ) {}

  private async _getUser(email: string) {
    const user = (
      await this.drizzleService.db
        .select()
        .from(schema.user)
        .where(eq(schema.user.email, email))
        .limit(1)
    ).at(0);
    if (!user || Object.keys(user).length === 0) return undefined;
    return user;
  }

  async createUser(userObj: {
    first_name: string;
    last_name: string;
    email: string;
  }) {
    const randomPassword = generateRandomPassword(15);
    const randomPasswordHash = genHash(randomPassword);
    if (await this._getUser(userObj.email))
      throw new ConflictException({
        success: false,
        reason: 'User already exists',
      });
    const newUser = await this.drizzleService.db
      .insert(schema.user)
      .values({ ...userObj, password: randomPasswordHash })
      .returning();
    let emailSent = false;
    try {
      await this.mailer.sendMail(userObj.email, {
        template: 'welcome',
        subject: 'Account credentials for Safetrade',
        templateArgs: {
          first_name: userObj.first_name,
          password: randomPassword,
        },
      });
      emailSent = true;
    } catch (err) {}
    // TODO : Omit password property
    return { user: newUser.at(0).email, notified: emailSent };
  }

  async getUser(email: string, options?: { throw?: boolean }) {
    const user = await this._getUser(email);
    if (!user) {
      if (options?.throw) throw new NotFoundException();
      return;
    }
    return _.omit(user, this.sensitive_props);
  }

  async validateUserCredentials(email: string, password: string) {
    const user = await this._getUser(email);
    if (!user) throw new NotFoundException('User not found');
    return verifyHash(password, user.password);
  }
}
