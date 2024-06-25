import {
  boolean,
  date,
  jsonb,
  pgTable,
  smallint,
  smallserial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  withAdditionalMeta,
  withCreatedAt,
  withTimestamps,
  withTrackingActivity,
} from "../utils/withColumns";
import { auth_session_status, kyc_submission_status } from "./enums";
import { audit_trail } from "./logging";
import { SessionAdditional } from "../utils/types";
import { UserPreferences } from "common";

export const user = pgTable(
  "user",
  withCreatedAt({
    uid: uuid("uid").defaultRandom().primaryKey(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    password_hash: text("password_hash").notNull(),
    phone_no: text("phone_no"),
    dob: date("dob", { mode: "date" }).notNull(),
    deleted_at: timestamp("deleted_at"),
    is_verified: boolean("is_verified").default(false),
    is_onboarded: boolean("is_onboarded").default(false),
    kyc_level: smallint("kyc_level")
      .references(() => kyc_level.level)
      .default(0),
    user_preferences: jsonb("user_preferences").$type<
      UserPreferences & {
        [key: string]: string;
      }
    >(),
  })
);

export const kyc_submissions = pgTable(
  "kyc_submissions",
  withTrackingActivity({
    submission_id: uuid("submission_id").defaultRandom().primaryKey(),
    user: uuid("user")
      .references(() => user.uid)
      .notNull(),
    kyc_level: smallint("kyc_level").references(() => kyc_level.level),
    attachments: jsonb("attachments").$type<
      {
        attachment_meta: { [key: string]: string };
        storage_path: string;
      }[]
    >(),
    remarks: text("remarks"),
    status: kyc_submission_status("status"),
    reviewer_audit_trail_log_id: uuid("audit_trail_log_id").references(
      () => audit_trail.log_id
    ),
  })
);

export const user_session = pgTable(
  "user_session",
  withTimestamps({
    session_id: uuid("session_id").defaultRandom().primaryKey(),
    user_uid: uuid("user_uid")
      .references(() => user.uid, { onDelete: "cascade" })
      .notNull(),
    ip_address: text("ip_address").notNull(),
    expire_at: timestamp("expire_at"),
    last_active: timestamp("last_active"),
    status: auth_session_status("status"),
    access_token: jsonb("access_tokens").$type<
      { access_token: string; refresh_token: string } & any
    >(),
    additional_meta: jsonb("additional_meta").$type<SessionAdditional>(),
  })
);

export const kyc_level = pgTable("kyc_level", {
  level: smallserial("level").primaryKey(),
  level_name: text("level_name"),
  order: smallint("order").unique().default(0),
  requirements: jsonb("requirements").$type<string[]>(),
});
