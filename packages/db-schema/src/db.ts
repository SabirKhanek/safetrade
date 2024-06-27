import path from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import * as schema from "./schema";
import { Logger } from "drizzle-orm";
import { config } from "dotenv";
// config({ path: path.join(__dirname, "..", "..", "..", ".env") });
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export async function getConnection({
  logging = false,
}: {
  logging?: boolean;
}) {
  const connection = new Client({
    host: PGHOST!,
    database: PGDATABASE!,
    user: PGUSER!,
    password: PGPASSWORD!,
    ssl: false,
  });

  await connection.connect();

  const db = drizzle(connection, { schema, logger: logging });

  return { db, connection };
}

export async function getPoolConnection({
  logging,
  timeout
}: {
  logging?: boolean | Logger;
  timeout?: number
}) {
  const pool = new Pool({
    host: PGHOST!,
    database: PGDATABASE!,
    user: PGUSER!,
    password: PGPASSWORD!,
    ssl: false,
    idleTimeoutMillis: timeout,
  });
  const client = await pool.connect();
  const db = drizzle(client, { schema, logger: logging });
  return { db, client };
}
