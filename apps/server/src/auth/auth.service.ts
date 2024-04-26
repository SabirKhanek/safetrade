import { schema } from 'db-schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from 'src/drizzle.service';
import { UsersService } from 'src/users/users.service';

export interface AuthPayload {
  email: string;
  session_id: string;
  user: {
    first_name: string;
    last_name: string;
    joinedOn: Date;
  };
  sessionCreatedOn: Date;
  sessionWillExpireOn: Date;
  iat: number;
  exp: number;
}
@Injectable()
export class AuthService {
  constructor(
    private drizzleService: DrizzleService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string) {
    const verify = await this.userService.validateUserCredentials(
      email,
      password,
    );
    if (!verify) throw new UnauthorizedException('Invalid credentials');
    const user = await this.userService.getUser(email);
    const session = await this.initiateSession(email);
    const payload: AuthPayload = {
      email,
      session_id: session.session_id,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        joinedOn: user.createdAt,
      },
      sessionCreatedOn: session.createdAt,
      sessionWillExpireOn: new Date(
        session.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000,
      ),
      iat: session.createdAt.getTime(),
      exp: session.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000,
    };
    const token = await this.jwtService.signAsync(JSON.stringify(payload));
    return token;
  }

  // TODO implement session logout functionality
  async validateAuthToken(token: string) {
    try {
      const isTokenValid =
        await this.jwtService.verifyAsync<AuthPayload>(token);
      return isTokenValid;
    } catch (err) {
      throw new UnauthorizedException({
        success: false,
        reason: 'Invlaid token was provided',
      });
    }
  }

  private async initiateSession(email: string) {
    const session = await this.drizzleService.db
      .insert(schema.user_session)
      .values({ email })
      .onConflictDoNothing()
      .returning();
    return session.at(0);
  }
}
