import { Injectable } from '@nestjs/common';
import { User } from 'api-contract';
import { eq, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { schema } from '../db-schema';
@Injectable()
export class UsersService {
  constructor(private drizzleService: DrizzleService) {}
  users: User[] = [{ username: 'sabir', password: 'dev', about: 'Sabir Khan' }];

  async getUser(username: string) {
    const userFromDb = (
      await this.drizzleService.db
        .select()
        .from(schema.user)
        .where(eq(schema.user.username, username))
    ).at(0);
    return userFromDb;
  }

  async getAll() {
    return this.drizzleService.db.select().from(schema.user);
  }
}
