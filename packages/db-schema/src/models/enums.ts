import { pgEnum } from "drizzle-orm/pg-core";

export const auth_session_status = pgEnum("system_user_status", [
  "active",
  "expired",
  "logged_out",
]);

export const kyc_submission_status = pgEnum("kyc_submission_status", [
  "under-review",
  "more-information-required",
  "rejected",
  "accepted",
]);

export const tracking_activity_status = pgEnum("activity_status", [
  "completed",
  "in-progress",
]);

export const user_profile_status = pgEnum("user_profile_status", [
  "suspended",
  "active",
  "deactivated",
  "restricted",
]);

export const offer_status = pgEnum("offer_status", [
  "active",
  "suspended",
  "on-hold",
  "completed",
  "dealing",
]);

export const suspension__status = pgEnum("suspension_status", [
  "active",
  "under-review",
  "released",
]);

export const wallet_audit_status = pgEnum("wallet_audit_status", [
  "active",
  "flagged",
  "restricted",
]);

export const wallet_activity_type = pgEnum("wallet_activity_type", [
  "debit",
  "credit",
]);

export const wallet_activity_status = pgEnum("activity_status", [
  "realized",
  "unrealized",
  "reversed",
]);

export const withdrawl_status = pgEnum("withdrawl_status", [
  "received",
  "in-review",
  "submitted",
  "on-hold",
  "rejected",
  "completed",
]);

export const deposit_status = pgEnum("deposit_status", [
  "received",
  "in-process",
  "reversed",
  "on-hold",
  "credited",
]);

export const transaction_status = pgEnum("transaction_status", [
  "buyer_locked",
  "waiting_for_buyer",
  "waiting_for_seller_deliverable",
  "seller_delivered / waiting_for_buyer_confirmation",
  "buyer_confirmed / held_for_review",
  "payment_released",
]);

export const dummy_triggerr_schema_generate_enum = pgEnum(
  "dummy_triggerr_schema_generate_enum",
  ["seeding role_group", "seeding_kyc_levels"]
);
