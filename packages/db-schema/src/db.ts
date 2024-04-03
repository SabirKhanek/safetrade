import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import * as schema from "./index";
import { Logger } from "drizzle-orm";
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
    ssl: true,
  });

  await connection.connect();

  const db = drizzle(connection, { schema, logger: logging });

  return { db, connection };
}

export async function getPoolConnection({
  logging,
}: {
  logging?: boolean | Logger;
}) {
  const pool = new Pool({
    host: PGHOST!,
    database: PGDATABASE!,
    user: PGUSER!,
    password: PGPASSWORD!,
    ssl: true,
  });
  const client = await pool.connect();
  const db = drizzle(client, { schema, logger: logging });
  return { db, client };
}
