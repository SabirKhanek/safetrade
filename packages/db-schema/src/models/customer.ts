import {
  json,
  pgTable,
  text,
  uuid,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { withTimestamps } from "../utils/withColumns";

export const customer = pgTable(
  "customer",
  withTimestamps({
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").unique(undefined, { nulls: "distinct" }),
    phone_no: text("phone_no").unique(undefined, { nulls: "distinct" }),
    first_name: text("first_name"),
    last_name: text("last_name"),
    meta: jsonb("meta"),
  })
);
