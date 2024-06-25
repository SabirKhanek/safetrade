import {
  integer,
  jsonb,
  pgTable,
  serial,
  smallint,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { withTimestamps } from "../utils/withColumns";

export const otp = pgTable(
  "otp",
  withTimestamps({
    id: serial("id").primaryKey(),
    otp: varchar("otp", { length: 6 }).notNull(),
    status: text("status", { enum: ["active", "used", "expired"] }),
  })
);

export const otp_verification = pgTable(
  "otp_ver",
  withTimestamps({
    id: uuid("id").primaryKey().defaultRandom(),
    active_otp: integer("otp_id").references(() => otp.id),
    otps: jsonb("otps").$type<number[]>(),
    email: text("email").notNull(),
    status: text("status", {
      enum: ["verified", "exhausted", "expired", "active"],
    })
      .default("active")
      .notNull(),
  })
);
