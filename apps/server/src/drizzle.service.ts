import { Global, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './db-schema';
@Injectable()
export class DrizzleService implements OnApplicationBootstrap {
  db: NodePgDatabase<typeof schema>;

  async onApplicationBootstrap() {
    const logger = Logger.verbose as any;
    const { client, db } = await schema.getPoolConnection({ logging: true });
    this.db = db;
  }
}
