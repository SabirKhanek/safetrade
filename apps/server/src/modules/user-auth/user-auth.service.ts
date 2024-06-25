import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionAdditional, UserAuthPayload } from 'common';
import { schema } from 'db-schema';
import { InferSelectModel } from 'drizzle-orm';
import { EmailService } from 'src/modules/email/email.service';
import {
  SessionInfo,
  SessionService,
  UserSessionService,
} from 'src/services/session.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class UserAuthService {
  private logger = new Logger(UserAuthService.name);
  constructor(
    private sessionService: UserSessionService,
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}
  async generateAuthPayload(
    session_id: string,
    session?: Awaited<
      ReturnType<typeof this.sessionService.getActiveSessionById>
    >,
    user?: Awaited<ReturnType<typeof this.userService.getUserByUid>>,
  ) {
    if (!session) {
      session = await this.sessionService.getActiveSessionById(session_id);
      this.logger.debug('fetched active session from the database');
    } else {
      this.logger.debug('session was provided skipping querying seperately');
    }

    const additiona_meta: SessionAdditional = session.additional_meta;
    if (!user) {
      user = await this.userService.getUserByUid(session.user_uid);
      this.logger.debug('fetched user from the database');
    } else {
      this.logger.debug('user was provided. skipping querying seperately');
    }

    const payload: UserAuthPayload = {
      email: user.email,
      exp: new Date(session.expire_at).getTime(),
      iat: new Date(session.created_at).getTime(),
      deferred: additiona_meta.deferred,
      session_id: session.session_id,

      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        joined_at: user.joined_at,
        kyc_level: user.kyc_level,
      },
      user_uid: session.system_uid,
      challenge: additiona_meta.challenge
        ? {
            type: additiona_meta.challenge?.type,
            verified: additiona_meta.challenge.isCompleted,
          }
        : undefined,
      display_name: user.display_name,
    };
    return payload;
  }

  async authenticate(
    email: string,
    password: string,
    session_info: Omit<SessionInfo, 'deferred' | 'challenge'>,
  ) {
    const user = await this.userService.verifyUserCredenetials(email, password);
    this.logger.debug('credentials were verified');
    const is2FAEnabled = user.user_preferences?.twofactor?.enabled;
    if (is2FAEnabled) this.logger.debug('deferred because 2FA was enabled');
    const defaultDeferred = true;
    if (defaultDeferred)
      this.logger.debug('deferred because default deferred enabled');
    const deferred = is2FAEnabled || defaultDeferred;

    // TODO: Implement a way to detect new logins and skipping on recognized devices
    this.logger.debug('requesting session service to initiate session');
    const session = await this.sessionService.initiateSession(user.uid, {
      ip_address: session_info.ip_address,
      useragent: session_info.useragent,
      deferred,
    });
    const auth_payload = this.generateAuthPayload(
      session.session_id,
      session,
      user,
    );
    this.sessionService
      .sendLoginAlert(user.email, session.ip_address, session.additional_meta)
      .catch((err) => {
        this.logger.debug('login alert was not sent');
        this.logger.debug(err);
      });
    return auth_payload;
  }

  signPayload(payload: UserAuthPayload) {
    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload: string) {
    return await this.jwtService.verifyAsync(payload, {});
  }
}
