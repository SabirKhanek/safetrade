import { decimal, jsonb, pgEnum, pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import {
  withCreatedAt,
  withTimestamps,
  withAdditionalMeta,
} from "../utils/withColumns";
import { tracking_activity_status } from "./enums";
import { user } from "./user_ops";

export const audit_trail = pgTable(
  "audit_trail",
  withAdditionalMeta(
    withTimestamps({
      log_id: uuid("log_id").defaultRandom().primaryKey(),
      performed_by: uuid("performed_by").notNull(),
      // performer_deletion_snapshot: jsonb("performer_deletion_snapshot"),
      activity_data: jsonb("activity_data"),
      activity_name: text("activity_name"),
    })
  )
);

export const deleted_system_user_snapshot = pgTable(
  "deleted_system_user_snapshot",
  withCreatedAt({
    system_uid: uuid("system_uid").primaryKey(),
    snapshot: jsonb("snapshot"),
  })
);

export const public_user_activity_trail = pgTable(
  "public_user_activity_trail",
  withAdditionalMeta(
    withTimestamps({
      log_id: uuid("log_id").defaultRandom().primaryKey(),
      performed_by: uuid("performed_by").notNull(),
      // performer_deletion_snapshot: jsonb("performer_deletion_snapshot"),
      activity_data: jsonb("activity_data"),
      activity_name: text("activity_name"),
    })
  )
);

export const deleted_user_snapshot = pgTable(
  "deleted_user_snapshot",
  withCreatedAt({
    user_id: uuid("user_id").primaryKey(),
    snapshot: jsonb("snapshot"),
  })
);

export const tracking_activity = pgTable(
  "tracking_activity",
  withCreatedAt({
    activity_id: uuid("activity_id").defaultRandom().primaryKey(),
    activity_status:
      tracking_activity_status("activity_status").default("in-progress"),
  })
);

export const tracking_logs = pgTable(
  "tracking_logs",
  withAdditionalMeta(
    withCreatedAt({
      activity: uuid("activity")
        .notNull()
        .references(() => tracking_activity.activity_id, {
          onDelete: "cascade",
        }),
      message: text("message"),
    })
  )
);

export const dashboard_analytics = pgTable(
  "dashboard_analytics",
  withTimestamps({
    key: text("string").primaryKey(),
    analytics: jsonb("analytics").$type<{ [key: string]: any }>().notNull(),
  })
);

export const userDashBoardAnalytics = pgTable(
  "user_dashboard_analytics",
  withCreatedAt({
    key: text("string").primaryKey(),
    analytics: jsonb("analytics").$type<{ [key: string]: any }>().notNull(),
    user: uuid("user").references(()=>user.uid).notNull()
  })
);

export const customer_feedback = pgTable("customer_feedback", {
  feedback_meta: jsonb("feedback_meta"),
  stars: smallint("stars").notNull().default(0),
  message: text("message")
});
