import { jsonb, timestamp } from "drizzle-orm/pg-core";

export function withTimestamps<T>(schema: T) {
  const props = {
    createdAt: timestamp("created_at").defaultNow(),
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
export function withAdditionalMeta<T>(schema: T) {
  const props = {
    additional_meta: jsonb("additional_meta"),
  };
  return {
    ...schema,
    ...props,
  };
}
