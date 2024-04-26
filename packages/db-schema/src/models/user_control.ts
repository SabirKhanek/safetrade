import { json, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { withTimestamps } from "../utils/withColumns";

export const user = pgTable(
  "user",
  withTimestamps({
    email: text("email").primaryKey(),
    password: text("password").notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
  })
);

export const user_session = pgTable(
  "user_session",
  withTimestamps({
    session_id: uuid("session_id").defaultRandom().primaryKey(),
    email: text("email")
      .references(() => user.email)
      .notNull(),
  })
);
