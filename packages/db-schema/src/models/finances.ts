import { config } from "dotenv";
import {
  bigint,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./user_ops";
import {
  transaction_status,
  wallet_activity_type,
  wallet_audit_status,
  withdrawl_status,
} from "./enums";
import {
  withAdditionalMeta,
  withCreatedAt,
  withTimestamps,
  withTrackingActivity,
} from "../utils/withColumns";
import { audit_trail, tracking_activity } from "./logging";
import { sell_offer } from "./marketplace";

export const wallet = pgTable("wallet", {
  wallet_id: uuid("wallet_id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => user.uid)
    .notNull(),
  balance: bigint("balance", { mode: "number" }).default(0).notNull(),
  unrealized_balance: bigint("unrealized_balance", { mode: "number" })
    .default(0)
    .notNull(),
  wallet_audit_status: wallet_audit_status("wallet_audit_status").default(
    "active"
  ),
});

// TODO: Add trigger in generated schema to insert snapshot on each update
export const wallet_audit_trail = pgTable(
  "wallet_audit_trail",
  withCreatedAt({
    log_id: uuid("log_id").defaultRandom().primaryKey(),
    wallet_id: uuid("wallet_id").notNull(),
    wallet_snapshot: jsonb("wallet_snapshot"),
  })
);

export const wallet_activity = pgTable(
  "wallet_activity",
  withCreatedAt({
    activity_id: uuid("activity_id").defaultRandom().primaryKey(),
    wallet_id: uuid("wallet_id")
      .references(() => wallet.wallet_id)
      .notNull(),
    activity_type: wallet_activity_type("activity_type").notNull(),
    activity_reference: uuid("activity_reference").notNull(),
    amount: bigint("amount", { mode: "number" }).notNull(),
    activity_timestamp: timestamp("activity_timestamp"),
    activity_subject: text("activity_subject").notNull(),
    activity_status: wallet_audit_status("activity_status").notNull(),
  })
);

export const withdrawl = pgTable(
  "withdrawl",
  withTrackingActivity(
    withCreatedAt({
      withdrawl_id: uuid("withdrawl_id").defaultRandom().primaryKey(),
      wallet_id: uuid("wallet_id")
        .references(() => wallet.wallet_id)
        .notNull(),
      withdrawl_amount: bigint("withdrawl_amount", {
        mode: "number",
      }).notNull(),
      withdrawl_status: withdrawl_status("withdrawl_status")
        .default("received")
        .notNull(),
      withdrawl_logs: jsonb("withdrawl_logs").$type<{ [key: string]: any }>(),
      withdraw_destination_details: jsonb("withdraw_destination_details"),
      withdraw_processed_audit_log: uuid("withdraw_processed_audit_log")
        .references(() => audit_trail.log_id)
        .notNull(),
    })
  )
);

export const deposit = pgTable(
  "deposit",
  withTimestamps(
    withTrackingActivity({
      deposit_id: uuid("deposit_id").primaryKey().defaultRandom(),
      wallet_id: uuid("wallet_id")
        .references(() => wallet.wallet_id)
        .notNull(),
      deposit_amount: bigint("deposit_amount", { mode: "number" }).notNull(),
      deposit_src: text("deposit_src").notNull(),
      deposit_details: jsonb("deposit_details").notNull().default({}),
      deposit_logs: jsonb("deposit_logs").notNull().default({}),
      deposit_verified_audit_log: uuid("deposit_verified_audit_log").references(
        () => audit_trail.log_id
      ),
    })
  )
);

// implement trigger to disable visibility of an offer
export const transaction = pgTable(
  "transaction",
  withAdditionalMeta(
    withTrackingActivity(
      withTimestamps({
        txn_id: uuid("txn_id").defaultRandom().primaryKey(),
        from_wallet: uuid("from_wallet")
          .references(() => wallet.wallet_id)
          .notNull(),
        to_wallet: uuid("to_wallet")
          .references(() => wallet.wallet_id)
          .notNull(),
        offer_id: uuid("offer_id")
          .references(() => sell_offer.offer_id)
          .notNull(),
        commission_amount: bigint("commision_amount", { mode: "number" }),
        transaction_amount: bigint("transaction_amount", { mode: "number" }),
        misc_charges:
          jsonb("misc_charges").$type<{ name: string; amount: number }[]>(),
        status: transaction_status("transaction_status").notNull(),
      })
    )
  )
);

export const transaction_audit_trail = pgTable(
  "transaction_audit_trail",
  withCreatedAt({
    log_id: uuid("log_id").defaultRandom().primaryKey(),
    txn_id: uuid("txn_id").notNull(),
    transaction_snapshot: jsonb("transaction_snapshot").notNull(),
    dff_summary: text("diff_summary").notNull(),
  })
);
