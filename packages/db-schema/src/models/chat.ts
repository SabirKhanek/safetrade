import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { withCreatedAt } from "../utils/withColumns";
import { user } from "./user_ops";

export const chat_thread = pgTable(
  "chat_threads",
  withCreatedAt({
    thread_id: uuid("thread_id").defaultRandom().primaryKey(),
  })
);

export const chat_thread_participant = pgTable(
  "chat_thread_participant",
  withCreatedAt({
    user_uid: uuid("user_uid").references(() => user.uid),
    thread_id: uuid("thread_id").references(() => chat_thread.thread_id),
  }),
  (table) => ({
    pk: primaryKey({ columns: [table.thread_id, table.user_uid] }),
  })
);

export const chat_message = pgTable(
  "chat_message",
  withCreatedAt({
    message_id: uuid("message_id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    sender: uuid("sender").notNull(),
    thread_id: uuid("thread_id").notNull(),
  })
);
