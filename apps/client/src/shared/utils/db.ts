// dbConnection.js
import { getPoolConnection, schema } from "db-schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

let db: NodePgDatabase<typeof schema>;

const dbConnectionPromise = getPoolConnection({ logging: true })
  .then((connection) => {
    db = connection.db;
  })
  .catch((error) => {
    console.error("Error establishing database connection:", error);
  });

export { db };
