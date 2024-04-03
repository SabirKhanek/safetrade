import type { Config } from "drizzle-kit";
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export default {
  schema: "./src/index.ts",
  out: "./dist/drizzle",
  driver: "pg",
  dbCredentials: {
    host: PGHOST!,
    database: PGDATABASE!,
    user: PGUSER!,
    password: PGPASSWORD!,
    ssl: true,
  },
  verbose: true,
  strict: true,
} satisfies Config;
