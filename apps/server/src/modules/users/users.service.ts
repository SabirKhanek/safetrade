import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SignUpParams } from './users.types';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from 'db-schema';
import { genHash, verifyHash } from 'src/shared/utils/hashing';
import _ from 'lodash';
import { MagiclinkService } from 'src/services/magic-link.service';
import { getPublicUrl, getVerficicationUrl } from 'src/shared/utils';
import { InferSelectModel, eq, or } from 'drizzle-orm';
import { EmailService } from 'src/modules/email/email.service';
export interface FilteredUser {
  joined_at: Date;
  display_name: string;
  transactions_completed: number;
  user_profile_status: string;
  avatar: string;
  total_ratings: string;
  slug: string;
  email: string;
  user_preferences?: InferSelectModel<typeof schema.user>['user_preferences'];
  first_name: string;
  last_name: string;
  kyc_level: number;
  uid: string;
  phone_no?: string;
  is_verified?: boolean;
  dob?: Date;
  wallet?: {
    balance: number;
    unrealized_balance: number;
    wallet_audit_status: string;
  };
}
@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private drizzleService: DrizzleService,
    private magicLinkService: MagiclinkService,
    private mailService: EmailService,
  ) {}
  async createUser(obj: SignUpParams) {
    const password_hash = genHash(obj.password);
    const is_verified = obj.is_verified || false;
    const user = await this.drizzleService.db.transaction(async (txn) => {
      let user: InferSelectModel<typeof schema.user>;
      try {
        user = (
          await txn
            .insert(schema.user)
            .values({
              password_hash,
              first_name: obj.first_name,
              last_name: obj.last_name,
              email: obj.email,
              is_verified,
              kyc_level: 0,
              is_onboarded: true,
              dob: obj.dob,
            })
            .returning()
        ).at(0);
      } catch (err) {
        txn.rollback();
        this.logger.debug("User couln't be created");
        this.logger.debug(err);
        throw new BadRequestException(
          "User couldn't be created.  It already exists",
        );
      }
      this.logger.debug('user created');
      this.logger.debug(user);
      const wallet = await txn
        .insert(schema.wallet)
        .values({ user_id: user.uid });
      this.logger.debug("user's wallet created");
      this.logger.debug(wallet);
      this.logger.debug('onboarding user');
      const user_profile = await txn.insert(schema.user_profile).values({
        display_name: `${user.first_name.toLowerCase()}_${user.last_name.toLowerCase()}_${user.uid.slice(0, 5)}`,
        slug: `${user.first_name.toLowerCase()}_${user.last_name.toLowerCase()}_${user.uid.slice(0, 5)}`,
        user_id: user.uid,
      });
      this.logger.debug('created user profile');
      if (!obj.is_verified) {
        try {
          this.magicLinkService.sendMagicLink(
            user.email,
            getVerficicationUrl(),
            'Safetrade | Email Confirmation',
          );
        } catch (err) {}
      }
      return _(user).omit('password_hash').value();
    });
    this.logger.debug('sending welcome email');
    if (user) {
      this.mailService
        .sendMail(user.email, {
          template: 'welcome-user',
          subject: 'Welcome to safetrade!',
          templateArgs: { first_name: user.first_name },
        })
        .catch((e) => {
          this.logger.debug('Failed to send email');
          this.logger.debug(e);
        });
    }
    return user;
  }

  async handleOnboarding(
    obj: { display_name: string; slug?: string },
    uid: string,
  ) {
    let notified = false;

    const isOnboarded = await this.drizzleService.db.transaction(
      async (txn) => {
        let {
          is_onboarded: isOnboarded,
          is_verified: isVerified,
          email,
        } = (
          await txn
            .select({
              is_onboarded: schema.user.is_onboarded,
              is_verified: schema.user.is_verified,
              email: schema.user.email,
            })
            .from(schema.user)
            .where(eq(schema.user.uid, uid))
        ).at(0);

        if (!isVerified)
          throw new BadRequestException('user needs to be verified first');

        if (isOnboarded)
          throw new BadRequestException('user was already onboaerded');

        await txn.insert(schema.user_profile).values({
          display_name: obj.display_name,
          slug: obj.slug || obj.display_name,
          user_id: uid,
        });
        const { is_onboarded } = (
          await txn
            .update(schema.user)
            .set({ is_onboarded: true })
            .returning({ is_onboarded: schema.user.is_onboarded })
        ).at(0);

        try {
          await this.mailService.sendMail(email, {
            template: 'welcome-public',
            templateArgs: {
              displayName: obj.display_name,
              userProfileUrl: getPublicUrl() + `/profile/${obj.slug}`,
            },
          });
          notified = true;
        } catch (err) {}

        return is_onboarded;
      },
    );

    return { is_onboarded: isOnboarded, notified };
  }

  async verifyUserCredenetials(email: string, password: string) {
    const userData = await this._getUserByEmail(email);
    if (!userData) throw new BadRequestException("User doesn't exist");
    const verifyPass = verifyHash(password, userData.user.password_hash);
    if (!verifyPass) throw new BadRequestException('Invalid password');
    return this._filterUserObj(userData, false);
  }

  async _getUserByEmail(email: string) {
    const user = (
      await this.drizzleService.db
        .select()
        .from(schema.user)
        .leftJoin(
          schema.user_profile,
          eq(schema.user.uid, schema.user_profile.user_id),
        )
        .leftJoin(schema.wallet, eq(schema.wallet.wallet_id, schema.user.uid))
        .where(eq(schema.user.email, email))
    ).at(0);
    if (!user) throw new BadRequestException("User doesn't exist");
    return user;
  }

  async _getUserByUid(uid: string) {
    const user = (
      await this.drizzleService.db
        .select()
        .from(schema.user)
        .leftJoin(
          schema.user_profile,
          eq(schema.user.uid, schema.user_profile.user_id),
        )
        .leftJoin(schema.wallet, eq(schema.wallet.user_id, schema.user.uid))
        .where(eq(schema.user.uid, uid))
    ).at(0);
    if (!user) throw new BadRequestException("User doesn't exist");
    return user;
  }
  async getUserByUid(uid: string, include_wallet = false) {
    this.logger.debug(`Fetching user with uid: ${uid}`);
    const user = await this._getUserByUid(uid);
    return this._filterUserObj(user, include_wallet);
  }
  async getUser(email: string, include_wallet = false) {
    const user = await this._getUserByEmail(email);
    return this._filterUserObj(user, include_wallet);
  }

  async _filterUserObj(
    user: Awaited<ReturnType<typeof this._getUserByEmail>>,
    includeWallet = false,
    requestedBy?: string,
  ) {
    this.logger.debug('Filtering sensitive information from user object');

    const {
      user: {
        uid,
        created_at,
        first_name,
        last_name,
        kyc_level,
        phone_no,
        is_verified,
        email,
        user_preferences,
        dob,
      },
      user_profile,
      wallet,
    } = user;

    const isOwned = requestedBy === uid;

    let userToReturn: FilteredUser = {
      uid: uid,
      joined_at: created_at,
      display_name: user_profile?.display_name || null,
      transactions_completed: user_profile?.transactions_completed || 0,
      user_profile_status: user_profile?.user_profile_status || null,
      avatar: user_profile?.avatar || null,
      total_ratings: user_profile?.total_ratings || '0',
      slug: user_profile?.slug || null,
      email,
      user_preferences,
      first_name,
      last_name,
      kyc_level,
    };

    if (isOwned) {
      userToReturn = { ...userToReturn, phone_no, is_verified, dob };
    }

    if (includeWallet && isOwned) {
      userToReturn = {
        ...userToReturn,
        wallet: wallet
          ? {
              balance: wallet.balance,
              unrealized_balance: wallet.unrealized_balance,
              wallet_audit_status: wallet.wallet_audit_status,
            }
          : null,
      };
    }

    return userToReturn;
  }

  async sendVerificationEmail(uid?: string, email?: string) {
    const user = (
      await this.drizzleService.db
        .select({
          is_verified: schema.user.is_verified,
          email: schema.user.email,
        })
        .from(schema.user)
        .where(or(eq(schema.user.uid, uid), eq(schema.user.email, email)))
    ).at(0);
    if (!user) throw new BadRequestException('User does not exist');
    if (user.is_verified)
      throw new BadRequestException('User is already verified');
    await this.magicLinkService.sendMagicLink(
      user.email,
      getVerficicationUrl(),
      'Safetrade | Email Verification Request',
    );
    return true;
  }

  async verifyUserEmail(magiclink: string) {
    const result = await this.magicLinkService.verifyMagicLink(magiclink);
    if (result.success) {
      const userVerified = await this.drizzleService.db.transaction(
        async (txn) => {
          try {
            await txn.update(schema.user).set({ is_verified: true });
            await txn.update(schema.magiclinks).set({ used: true });
            return true;
          } catch (err) {
            txn.rollback();
            return false;
          }
        },
      );
      return userVerified;
    } else {
      throw new BadRequestException(result.detail);
    }
  }
}
