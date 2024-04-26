import type { Config } from "drizzle-kit";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(__dirname, "..", "..", ".env") });
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: PGHOST!,
    database: PGDATABASE!,
    user: PGUSER!,
    password: PGPASSWORD!,
    ssl: false,
  },
  verbose: true,
  strict: true,
} satisfies Config;
