DO $$ BEGIN
 CREATE TYPE "deposit_status" AS ENUM('received', 'in-process', 'reversed', 'on-hold', 'credited');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "transaction_status" AS ENUM('buyer_locked', 'waiting_for_buyer', 'waiting_for_seller_deliverable', 'seller_delivered / waiting_for_buyer_confirmation', 'buyer_confirmed / held_for_review', 'payment_released');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "wallet_activity_type" AS ENUM('debit', 'credit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "wallet_audit_status" AS ENUM('active', 'flagged', 'restricted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "withdrawl_status" AS ENUM('received', 'in-review', 'submitted', 'on-hold', 'rejected', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "offer_status" ADD VALUE 'dealing';--> statement-breakpoint
ALTER TYPE "activity_status" ADD VALUE 'realized';--> statement-breakpoint
ALTER TYPE "activity_status" ADD VALUE 'unrealized';--> statement-breakpoint
ALTER TYPE "activity_status" ADD VALUE 'reversed';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_feedback" (
	"feedback_meta" jsonb,
	"stars" smallint DEFAULT 0 NOT NULL,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dashboard_analytics" (
	"string" text PRIMARY KEY NOT NULL,
	"analytics" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_dashboard_analytics" (
	"string" text PRIMARY KEY NOT NULL,
	"analytics" jsonb NOT NULL,
	"user" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tracking_logs" ADD COLUMN "additional_meta" jsonb;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_user_uid_fk" FOREIGN KEY ("user_id") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_dashboard_analytics" ADD CONSTRAINT "user_dashboard_analytics_user_user_uid_fk" FOREIGN KEY ("user") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
