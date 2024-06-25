import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const magiclinks = pgTable("magiclinks", {
  magicstring: text("magicstring").primaryKey(),
  email: text("email").notNull(),
  expire_at: timestamp("expire_at").default(sql`NOW() + INTERVAL '10 minutes'`),
  used: boolean("used").default(false),
});
