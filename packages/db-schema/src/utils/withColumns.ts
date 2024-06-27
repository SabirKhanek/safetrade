import { jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import {
  audit_trail,
  public_user_activity_trail,
  system_user,
  tracking_activity,
} from "../schema";
import { sql } from "drizzle-orm";

export function withTimestamps<T>(schema: T) {
  const props = {
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
  };
  return {
    ...schema,
    ...props,
  };
}

export function withCreatedAt<T>(schema: T) {
  const props = {
    created_at: timestamp("created_at").defaultNow(),
  };
  return {
    ...schema,
    ...props,
  };
}

export function withDeletedAt<T>(schema: T) {
  const props = {
    deleted_at: timestamp("deleted_at").default(sql`NULL`),
  };
  return {
    ...schema,
    ...props,
  };
}

export function withAdditionalMeta<T>(schema: T) {
  const props = {
    additional_meta: jsonb("additional_meta"),
  };
  return {
    ...schema,
    ...props,
  };
}

export function withAuditTrailLog<T>(schema: T, nullable = false) {
  let chain = uuid("audit_trail_log_id").references(() => audit_trail.log_id);
  if (!nullable) {
    chain = chain.notNull();
  }
  const props = {
    audit_trail_logs: chain,
  };
  return {
    ...schema,
    ...props,
  };
}

export function withAuditTrailLogs<T>(schema: T, nullable = false) {
  let chain = jsonb("audit_trail_logs").$type<string[]>().default([]);
  if (!nullable) {
    chain = chain.notNull();
  }
  const props = {
    audit_trail_logs: chain,
  };
  return {
    ...schema,
    ...props,
  };
}

export function withUserTrailLog<T>(schema: T, nullable = false) {
  let chain = uuid("user_activity_trail_log").references(
    () => public_user_activity_trail.log_id
  );
  if (!nullable) {
    chain = chain.notNull();
  }
  const props = {
    user_activity_trail_log: chain,
  };
  return {
    ...schema,
    ...props,
  };
}

export function withUserTrailLogs<T>(schema: T, nullable = false) {
  let chain = jsonb("user_activity_trail_logs").$type<string[]>().default([]);
  if (!nullable) {
    chain = chain.notNull();
  }
  const props = {
    user_activity_trail_logs: chain,
  };
  return {
    ...schema,
    ...props,
  };
}

export function withTrackingActivity<T>(schema: T, nullable = false) {
  let chain = uuid("tracking_activity_id").references(
    () => tracking_activity.activity_id
  );
  if (!nullable) {
    chain = chain;
  }
  const props = {
    tracking_activity_id: chain,
  };
  return {
    ...schema,
    ...props,
  };
}
