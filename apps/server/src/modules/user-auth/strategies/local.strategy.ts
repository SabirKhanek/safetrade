import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import configuration from 'src/config/configuration';
import { UserAuthService } from '../user-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(`User: ${LocalStrategy.name}`);
  constructor(private authService: UserAuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req, username: string, password: string): Promise<any> {
    const ip = configuration().development
      ? '182.181.136.138'
      : req.headers['x-forwarded-for'] || req.ip;
    const userAgent = req.headers['user-agent'];
    this.logger.debug(`Login requested for ${username} by ${ip}`);
    const payload = await this.authService.authenticate(username, password, {
      ip_address: ip,
      useragent: userAgent,
    });
    this.logger.debug('payload was generated');
    this.logger.debug(payload);
    return payload;
  }
}
