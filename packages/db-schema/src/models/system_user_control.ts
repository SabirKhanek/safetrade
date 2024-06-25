import {
  json,
  pgTable,
  text,
  uuid,
  timestamp,
  jsonb,
  pgEnum,
  primaryKey,
  unique,
  serial,
} from "drizzle-orm/pg-core";
import {
  withCreatedAt,
  withAuditTrailLog,
  withTimestamps,
  withDeletedAt,
  withAdditionalMeta,
} from "../utils/withColumns";
import { auth_session_status } from "./enums";
import { SessionAdditional } from "../utils/types";

export const system_user = pgTable(
  "system_user",
  withAuditTrailLog(
    withDeletedAt(
      withTimestamps({
        uid: uuid("uid").defaultRandom().primaryKey(),
        email: text("email").notNull().unique(undefined),
        first_name: text("first_name").notNull(),
        password_hash: text("password_hash").notNull(),
        last_name: text("last_name").notNull(),
        role_group: text("role_group").references(() => role_group.group_id, {
          onDelete: "set null",
        }),
      })
    )
  )
);

export const system_user_session = pgTable(
  "system_user_session",

  withTimestamps({
    session_id: uuid("session_id").defaultRandom().primaryKey(),
    system_uid: uuid("system_uid")
      .references(() => system_user.uid, { onDelete: "cascade" })
      .notNull(),
    ip_address: text("ip_address").notNull(),
    expire_at: timestamp("expire_at"),
    last_active: timestamp("last_active").defaultNow(),
    status: auth_session_status("status"),
    access_tokens:
      jsonb("access_tokens").$type<
        ({ access_token: string; refresh_token: string } & any)[]
      >(),
    additional_meta: jsonb("additional_meta").$type<SessionAdditional>(),
  })
);

export const role_group = pgTable(
  "role_group",
  withCreatedAt(
    withAuditTrailLog({
      group_id: text("group_id").primaryKey(),
    })
  )
);

export const system_permission = pgTable(
  "system_permission",
  withCreatedAt(
    withAuditTrailLog({
      permission: text("permission").primaryKey(),
    })
  )
);

export const system_permission_control = pgTable(
  "system_permission_control",
  withAuditTrailLog(
    withTimestamps({
      id: serial("control_id").primaryKey(),
      permission: text("permission")
        .notNull()
        .references(() => system_permission.permission, {
          onDelete: "cascade",
        }),
      system_uid: uuid("uid").references(() => system_user.uid, {
        onDelete: "cascade",
      }),
      group_id: text("group_id").references(() => role_group.group_id, {
        onDelete: "cascade",
      }),
    })
  ),
  (table) => {
    return {
      uk: unique("user_permission_uk").on(table.system_uid, table.permission),
      uk1: unique("group_permission_uk").on(table.group_id, table.permission),
    };
  }
);
