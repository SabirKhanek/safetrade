import { Injectable } from '@nestjs/common';
import { User } from 'api-contract';

@Injectable()
export class UsersService {
  users: User[] = [{ username: 'sabir', password: 'dev', about: 'Sabir Khan' }];

  async getUser(username: string) {
    return this.users.find((u) => username === u.username);
  }

  async getAll() {
    return this.users.map((u) => {
      return { username: u.username, about: u.about };
    });
  }
}
