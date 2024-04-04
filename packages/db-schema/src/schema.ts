import { pgSchema, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  username: text("username").primaryKey(),
  password: text("password"),
  about: text("about"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
