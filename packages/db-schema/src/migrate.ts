import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getConnection } from "./db";
import path from "path";
// import { sql } from "drizzle-orm";
async function main() {
  const { db, connection } = await getConnection({ logging: true });
  const dirPath = path.join(__dirname, "..", "drizzle");
  // await db.execute(sql`select 1`);
  await migrate(db, { migrationsFolder: dirPath });
  await connection.end();
}

main();
