import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { schema } from 'db-schema';
import { eq, or, sql } from 'drizzle-orm';
import { Groups } from 'src/access-control/accessctrl.type';
import { DrizzleService } from 'src/drizzle.service';
import { SystemUsersService } from 'src/system-users/users.service';

@Injectable()
export class InitRootUser implements OnApplicationBootstrap {
  constructor(
    private userService: SystemUsersService,
    private configService: ConfigService,
    // private drizzleService: DrizzleService,
  ) {}

  async onApplicationBootstrap() {
    const rootEmail = this.configService.getOrThrow('root_user');
    const root_uid = this.configService.getOrThrow('root_uid');
    const root_user_group = Groups.RootGroup;
    // const { system_permission_control, system_user } = schema;
    // console.log(root_user_group);
    // setTimeout(async () => {
    //   console.log(
    //     (
    //       ,
    //   );
    // }, 3000);

    try {
      const user = await this.userService.getUser(rootEmail, { throw: true });
    } catch (err) {
      try {
        console.log("Admin user wasn't created");
      } catch (err) {}
      const userCreated = await this.userService.createUser(
        {
          email: rootEmail,
          role_group: root_user_group,
          first_name: 'Admin',
          last_name: 'Safetrade',
          uid: root_uid,
        },
        root_uid,
        'Automatic root user creation',
      );
      console.log('User created', userCreated);
    }
  }
}
