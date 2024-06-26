import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SystemAuthService } from '../auth.service';
import configuration from 'src/config/configuration';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'system-local') {
  constructor(private authService: SystemAuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
      name: 'system-local',
    });
  }

  async validate(req, username: string, password: string): Promise<any> {
    const ip = configuration().development
      ? '182.181.136.138'
      : req.headers['x-forwarded-for']?.split(',').at(0);
    const userAgent = req.headers['user-agent'];
    const user = await this.authService.authenticate(username, password, {
      ip_address: ip,
      useragent: userAgent,
    });

    return user;
  }
}
