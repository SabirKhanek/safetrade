DO $$ BEGIN
 CREATE TYPE "offer_status" AS ENUM('active', 'suspended', 'on-hold', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "suspension_status" AS ENUM('active', 'under-review', 'released');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_profile_status" AS ENUM('suspended', 'active', 'deactivated', 'restricted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deleted_system_user_snapshot" (
	"system_uid" uuid PRIMARY KEY NOT NULL,
	"snapshot" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deleted_user_snapshot" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"snapshot" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public_user_activity_trail" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"performed_by" uuid NOT NULL,
	"activity_data" jsonb,
	"activity_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"additional_meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_notifications" (
	"priority" smallint DEFAULT 0,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"target" text,
	"notification_type" text DEFAULT 'default',
	"created_at" timestamp DEFAULT now(),
	"additional_meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer_suspensions" (
	"offer_suspension_id" uuid DEFAULT gen_random_uuid(),
	"on_suspension_audit_log" uuid,
	"suspension_released_activity_log" uuid,
	"suspension_remarks" text,
	"release_at" timestamp,
	"user_id" uuid,
	"status" "suspension_status" DEFAULT 'active',
	"tracking_activity_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"additional_meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_category" (
	"category_name" text PRIMARY KEY NOT NULL,
	"parent_category" text,
	"audit_trail_logs" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saved_offers" (
	"user_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "saved_offers_offer_id_user_id_pk" PRIMARY KEY("offer_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sell_offer" (
	"offer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"drafted_on" timestamp,
	"offer_status" "offer_status" DEFAULT 'active',
	"seller_profile" uuid,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"viewed_count" integer DEFAULT 0 NOT NULL,
	"thumbnail" text,
	"attachments" jsonb,
	"short_description" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"additional_meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seller_reviews" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"reviewer" uuid NOT NULL,
	"review_on" uuid NOT NULL,
	"stars" integer NOT NULL,
	"feedback" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_suspension" (
	"suspension_id" uuid DEFAULT gen_random_uuid(),
	"on_suspension_audit_log" uuid,
	"suspension_released_activity_log" uuid,
	"suspension_remarks" text,
	"release_at" timestamp NOT NULL,
	"user_id" uuid,
	"status" "suspension_status" DEFAULT 'active',
	"tracking_activity_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"additional_meta" jsonb
);
--> statement-breakpoint
ALTER TABLE "system_user_session" ADD COLUMN "access_tokens" jsonb;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "user_session" ADD COLUMN "access_tokens" jsonb;--> statement-breakpoint
ALTER TABLE "audit_trail" ADD COLUMN "additional_meta" jsonb;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "user_profile_status" "user_profile_status" DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "additional_meta" jsonb;--> statement-breakpoint
ALTER TABLE "system_user" DROP COLUMN IF EXISTS "access_tokens";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "access_tokens";--> statement-breakpoint
ALTER TABLE "audit_trail" DROP COLUMN IF EXISTS "performer_deletion_snapshot";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_suspensions" ADD CONSTRAINT "offer_suspensions_on_suspension_audit_log_audit_trail_log_id_fk" FOREIGN KEY ("on_suspension_audit_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_suspensions" ADD CONSTRAINT "offer_suspensions_suspension_released_activity_log_audit_trail_log_id_fk" FOREIGN KEY ("suspension_released_activity_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_suspensions" ADD CONSTRAINT "offer_suspensions_user_id_sell_offer_offer_id_fk" FOREIGN KEY ("user_id") REFERENCES "sell_offer"("offer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_suspensions" ADD CONSTRAINT "offer_suspensions_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_product_category_category_name_fk" FOREIGN KEY ("parent_category") REFERENCES "product_category"("category_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saved_offers" ADD CONSTRAINT "saved_offers_user_id_user_profile_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saved_offers" ADD CONSTRAINT "saved_offers_offer_id_sell_offer_offer_id_fk" FOREIGN KEY ("offer_id") REFERENCES "sell_offer"("offer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell_offer" ADD CONSTRAINT "sell_offer_seller_profile_user_profile_user_id_fk" FOREIGN KEY ("seller_profile") REFERENCES "user_profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell_offer" ADD CONSTRAINT "sell_offer_category_product_category_category_name_fk" FOREIGN KEY ("category") REFERENCES "product_category"("category_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller_reviews" ADD CONSTRAINT "seller_reviews_profile_id_user_uid_fk" FOREIGN KEY ("profile_id") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller_reviews" ADD CONSTRAINT "seller_reviews_reviewer_user_uid_fk" FOREIGN KEY ("reviewer") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller_reviews" ADD CONSTRAINT "seller_reviews_review_on_sell_offer_offer_id_fk" FOREIGN KEY ("review_on") REFERENCES "sell_offer"("offer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_suspension" ADD CONSTRAINT "user_suspension_on_suspension_audit_log_audit_trail_log_id_fk" FOREIGN KEY ("on_suspension_audit_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_suspension" ADD CONSTRAINT "user_suspension_suspension_released_activity_log_audit_trail_log_id_fk" FOREIGN KEY ("suspension_released_activity_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_suspension" ADD CONSTRAINT "user_suspension_user_id_user_profile_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_suspension" ADD CONSTRAINT "user_suspension_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
