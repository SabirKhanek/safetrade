import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { withTimestamps } from "../utils/withColumns";
import { customer } from "./customer";

export type DeviceMetadata = {
  imei: string;
  model: string;
  make: string;
  modelNumber: string;
  color: string;
  cosmetic_condition: string;
  category: string;
  meta: any;
};

export type DeviceTestingData = {
  [key: string]: boolean;
};

export type ServiceTicketInfo = {
  service: string;
  component: string;
  issue: string;
  [key: string]: any;
};

export type TicketAdditionalMeta = {
  referencedServiceListings?: string[];
  [key: string]: any;
};

export const ticket = pgTable(
  "ticket",

  withTimestamps({
    ticket_id: uuid("ticket_id").defaultRandom().primaryKey(),
    customer_id: uuid("customer_id")
      .references(() => customer.id)
      .notNull(),
    device_meta: jsonb("device_meta").$type<DeviceMetadata>(),
    ticket_type: text("ticket_type", {
      enum: ["sale", "buyback", "service"],
    }).notNull(),
    testing_info: jsonb("testing_info").$type<DeviceTestingData>(),
    additional_info: text("additional_info"),
    service_ticket_info: jsonb(
      "service_ticket_info"
    ).$type<ServiceTicketInfo>(),
    resolved_on: timestamp("resolved_on"),
    estimated_charges: integer("estimated_charges"),
    ticket_status: text("ticket_status"),
    additional_meta: jsonb("additional_meta").$type<TicketAdditionalMeta>(),
    service_ticket_flow: text("service_ticket_flow", {
      enum: ["checkin", "mailin", "onsite"],
    }),
  })
);
