import {
  PgTableExtraConfig,
  integer,
  json,
  jsonb,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { withAdditionalMeta, withTimestamps } from "../utils/withColumns";

export const device_make = pgTable("device_make", {
  name: text("name").primaryKey(),
  thumb_url: text("thumb_url"),
});

export const device_category = pgTable("device_category", {
  name: text("name").primaryKey(),
  thumb_url: text("thumb_url"),
});

export const device_model = pgTable("device_model", {
  id: uuid("id").defaultRandom().primaryKey(),
  sku: text("sku").unique(),
  model_numbers: jsonb("model_numbers").$type<string[]>(),
  status: text("status", { enum: ["active", "inactive"] }).default("inactive"),
  name: text("name").notNull(),
  thumb_url: text("thumb_url"),
  category: text("category")
    .references(() => device_category.name)
    .notNull(),
  make: text("make")
    .references(() => device_make.name)
    .notNull(),
  // dummy: json("g").$type<{slug: string, title: string}>()
});

export const known_issues = pgTable("known_issues", {
  title: text("title").primaryKey(),
});

export const known_test_items = pgTable("known_test_items", {
  title: text("title").primaryKey(),
});

export const device_category_issues = pgTable("device_category_issues", {
  device_category: text("device_category").references(
    () => device_category.name
  ),
  known_issue: text("known_issue").references(() => known_issues.title),
});

export const device_category_test_items = pgTable(
  "device_category_test_items",
  {
    device_category: text("device_category").references(
      () => device_category.name
    ),
    test_item: text("test_item").references(() => known_test_items.title),
  },
  (table) => {
    return {
      pk: [table.device_category, table.test_item],
    } satisfies PgTableExtraConfig;
  }
);

export const service_variants = pgTable(
  "service_variants",
  {
    name: text("service_variants"),
    service_id: uuid("service_id")
      .references(() => service.id)
      .notNull(),
    price: integer("price").default(0).notNull(),
  },
  (table) => {
    return { pk: [table.name, table.service_id] };
  }
);

export const service_category = pgTable("service_category", {
  name: text("name").primaryKey(),
});

export const service = pgTable(
  "service",
  withAdditionalMeta(
    withTimestamps({
      id: uuid("id").defaultRandom().primaryKey(),
      category: text("category")
        .references(() => service_category.name)
        .notNull(),
      device_id: uuid("device_id")
        .references(() => device_model.id)
        .notNull(),
      nick: text("nick").notNull(),
      status: text("status", { enum: ["active", "inactive"] })
        .default("inactive")
        .notNull(),
      sku: text("sku").unique(undefined, { nulls: "distinct" }),
      additional_details: text("additional_details"),
      related_to_issues:
        jsonb("related_to_issues").$type<
          (typeof known_issues.title.dataType)[]
        >(),
      duration_hours: integer("duration_hours"),
    })
  )
);
