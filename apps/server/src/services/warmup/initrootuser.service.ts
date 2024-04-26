import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InitRootUser implements OnApplicationBootstrap {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const rootEmail = this.configService.getOrThrow('root_user');
    try {
      const user = await this.userService.getUser(rootEmail, { throw: true });
    } catch (err) {
      try {
        console.log("Admin user wasn't created");
      } catch (err) {}
      const userCreated = await this.userService.createUser({
        email: rootEmail,
        first_name: 'Admin',
        last_name: 'SourTech',
      });
      console.log('User created', userCreated);
    }
  }
}
