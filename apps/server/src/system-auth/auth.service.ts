import { schema } from 'db-schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from 'src/drizzle.service';
import { SystemUsersService } from 'src/system-users/users.service';
import { InferInsertModel, and, eq } from 'drizzle-orm';
import { PermissionsType } from '../access-control/accessctrl.type';
import {
  SessionInfo,
  SystemUserSessionService,
} from 'src/services/session.service';
import { EmailService } from 'src/email/email.service';
import { SystemAuthPayload } from 'common';

@Injectable()
export class SystemAuthService {
  constructor(
    private userService: SystemUsersService,
    private jwtService: JwtService,
    private sessionService: SystemUserSessionService,
    private emailService: EmailService,
  ) {}

  async authenticate(
    email: string,
    password: string,
    session_info?: SessionInfo,
  ) {
    const verify = await this.userService.validateUserCredentials(
      email,
      password,
    );
    if (!verify) throw new UnauthorizedException('Invalid credentials');
    const user = await this.userService.getUser(email);
    const session = await this.sessionService.initiateSession(
      user.uid,
      session_info,
    );
    const payload: SystemAuthPayload = {
      email,
      user_uid: user.uid,
      session_id: session.session_id,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role_group,
        joined_at: user.created_at,
      },

      iat: session.created_at.getTime(),
      exp: session.expire_at.getTime(),
    };
    this.sessionService
      .sendLoginAlert(user.email, session.ip_address, session.additional_meta)
      .then()
      .catch();
    return payload;
  }

  async signAuthPayload(payload: SystemAuthPayload) {
    const token = await this.jwtService.signAsync(JSON.stringify(payload));
    return token;
  }

  // TODO implement session logout functionality
  async validateAuthToken(token: string) {
    try {
      const isTokenValid =
        await this.jwtService.verifyAsync<SystemAuthPayload>(token);
      return isTokenValid;
    } catch (err) {
      throw new UnauthorizedException({
        success: false,
        reason: 'Invlaid token was provided',
      });
    }
  }
}
