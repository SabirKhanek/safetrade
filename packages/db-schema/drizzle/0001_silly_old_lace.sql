CREATE TABLE IF NOT EXISTS "device_category" (
	"name" text PRIMARY KEY NOT NULL,
	"thumb_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_category_issues" (
	"device_category" text,
	"known_issue" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_category_test_items" (
	"device_category" text,
	"test_item" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_make" (
	"name" text PRIMARY KEY NOT NULL,
	"thumb_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_model" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sku" text,
	"model_numbers" jsonb,
	"status" text DEFAULT 'inactive',
	"name" text NOT NULL,
	"thumb_url" text,
	"category" text NOT NULL,
	"make" text NOT NULL,
	CONSTRAINT "device_model_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "known_issues" (
	"title" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "known_test_items" (
	"title" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" uuid PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"device_id" uuid NOT NULL,
	"nick" text NOT NULL,
	"status" text DEFAULT 'inactive' NOT NULL,
	"sku" text,
	"additional_details" text,
	"related_to_issues" jsonb,
	"duration_hours" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"additional_meta" jsonb,
	CONSTRAINT "service_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_category" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_variants" (
	"service_variants" text,
	"service_id" uuid NOT NULL,
	"price" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"phone_no" text,
	"first_name" text,
	"last_name" text,
	"meta" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "customer_email_unique" UNIQUE("email"),
	CONSTRAINT "customer_phone_no_unique" UNIQUE("phone_no")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket" (
	"ticket_id" uuid PRIMARY KEY NOT NULL,
	"customer_id" uuid NOT NULL,
	"device_meta" jsonb,
	"ticket_type" text NOT NULL,
	"testing_info" jsonb,
	"additional_info" text,
	"service_ticket_info" jsonb,
	"resolved_on" timestamp,
	"estimated_charges" integer,
	"ticket_status" text,
	"additional_meta" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"session_id" uuid,
	"username" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "about";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_category_issues" ADD CONSTRAINT "device_category_issues_device_category_device_category_name_fk" FOREIGN KEY ("device_category") REFERENCES "device_category"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_category_issues" ADD CONSTRAINT "device_category_issues_known_issue_known_issues_title_fk" FOREIGN KEY ("known_issue") REFERENCES "known_issues"("title") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_category_test_items" ADD CONSTRAINT "device_category_test_items_device_category_device_category_name_fk" FOREIGN KEY ("device_category") REFERENCES "device_category"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_category_test_items" ADD CONSTRAINT "device_category_test_items_test_item_known_test_items_title_fk" FOREIGN KEY ("test_item") REFERENCES "known_test_items"("title") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_model" ADD CONSTRAINT "device_model_category_device_category_name_fk" FOREIGN KEY ("category") REFERENCES "device_category"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_model" ADD CONSTRAINT "device_model_make_device_make_name_fk" FOREIGN KEY ("make") REFERENCES "device_make"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_category_service_category_name_fk" FOREIGN KEY ("category") REFERENCES "service_category"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_device_id_device_model_id_fk" FOREIGN KEY ("device_id") REFERENCES "device_model"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_variants" ADD CONSTRAINT "service_variants_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket" ADD CONSTRAINT "ticket_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_username_user_username_fk" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
