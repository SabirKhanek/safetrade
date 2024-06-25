import {
  decimal,
  foreignKey,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./user_ops";
import { offer_status, suspension__status, user_profile_status } from "./enums";
import {
  withAdditionalMeta,
  withAuditTrailLogs,
  withCreatedAt,
  withTimestamps,
  withTrackingActivity,
  withUserTrailLogs,
} from "../utils/withColumns";
import { audit_trail } from "./logging";

export const user_profile = pgTable(
  "user_profile",
  withAdditionalMeta({
    user_id: uuid("user_id")
      .references(() => user.uid, { onDelete: "cascade" })
      .primaryKey(),
    display_name: text("display_name").unique().notNull(),
    transactions_completed: integer("transactions_completed")
      .notNull()
      .default(0),
    total_ratings: decimal("total_ratings", { precision: 2, scale: 1 })
      .notNull()
      .default("0.00"),
    avatar: text("avatar"),
    user_profile_status: user_profile_status("user_profile_status").default(
      "active"
    ),
    profile_description: text("profile_description"),
    slug: text("slug").notNull(),
  })
);

export const saved_offers = pgTable(
  "saved_offers",
  withCreatedAt({
    user_id: uuid("user_id")
      .references(() => user_profile.user_id, {
        onDelete: "cascade",
      })
      .notNull(),
    offer_id: uuid("offer_id")
      .references(() => sell_offer.offer_id)
      .notNull(),
  }),
  (table) => ({ pk: primaryKey({ columns: [table.offer_id, table.user_id] }) })
);

export const user_suspension = pgTable(
  "user_suspension",
  withAdditionalMeta(
    withTimestamps(
      withTrackingActivity({
        suspension_id: uuid("suspension_id").defaultRandom(),
        on_suspension_audit_log: uuid("on_suspension_audit_log").references(
          () => audit_trail.log_id
        ),
        suspension_released_audit_log: uuid(
          "suspension_released_activity_log"
        ).references(() => audit_trail.log_id),
        suspension_remarks: text("suspension_remarks"),
        release_at: timestamp("release_at").notNull(),
        user_profile_id: uuid("user_id").references(() => user_profile.user_id),
        status: suspension__status("status").default("active"),
      })
    )
  )
);

export const sell_offer = pgTable(
  "sell_offer",

  withAdditionalMeta(
    withTimestamps({
      offer_id: uuid("offer_id").defaultRandom().primaryKey(),
      drafted_on: timestamp("drafted_on"),
      offer_status: offer_status("offer_status").default("active"),
      seller_profile: uuid("seller_profile").references(
        () => user_profile.user_id
      ),
      title: text("title").notNull(),
      category: text("category")
        .references(() => product_category.category_name)
        .notNull(),
      viewed_count: integer("viewed_count").notNull().default(0),
      thumbnail: text("thumbnail"),
      attachments: jsonb("attachments").$type<string[]>(),
      short_description: text("short_description"),
      description: text("description"),
    })
  )
);

export const product_category = pgTable(
  "product_category",
  withAuditTrailLogs({
    category_name: text("category_name").primaryKey(),
    parent: text("parent_category"),
  }),
  (table) => {
    return {
      fk: foreignKey({
        columns: [table.parent],
        foreignColumns: [table.category_name],
      }),
    };
  }
);

export const offer_suspensions = pgTable(
  "offer_suspensions",
  withAdditionalMeta(
    withTimestamps(
      withTrackingActivity({
        suspension_id: uuid("offer_suspension_id").defaultRandom(),
        on_suspension_audit_log: uuid("on_suspension_audit_log").references(
          () => audit_trail.log_id
        ),
        suspension_released_audit_log: uuid(
          "suspension_released_activity_log"
        ).references(() => audit_trail.log_id),
        suspension_remarks: text("suspension_remarks"),
        release_at: timestamp("release_at"),
        offer_id: uuid("user_id").references(() => sell_offer.offer_id, {
          onDelete: "cascade",
        }),
        status: suspension__status("status").default("active"),
      })
    )
  )
);

export const seller_reviews = pgTable(
  "seller_reviews",
  withCreatedAt({
    review_id: uuid("review_id").defaultRandom().primaryKey(),
    profile_id: uuid("profile_id")
      .references(() => user_profile.user_id)
      .notNull(),
    reviewer: uuid("reviewer")
      .references(() => user_profile.user_id)
      .notNull(),
    review_on: uuid("review_on")
      .references(() => sell_offer.offer_id)
      .notNull(),
    stars: integer("stars").notNull(),
    feedback: text("feedback").notNull(),
  })
);

export const notifications = pgTable(
  "user_notifications",
  withAdditionalMeta(
    withCreatedAt({
      priority: smallint("priority").default(0),
      subject: text("subject").notNull(),
      user_id: uuid("user_id")
        .references(() => user.uid)
        .notNull(),
      body: text("body").notNull(),
      target: text("target"),
      notification_type: text("notification_type")
        .$type<"default" | "system" | "messaging">()
        .default("default"),
    })
  )
);
