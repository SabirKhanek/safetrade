DO $$ BEGIN
 CREATE TYPE "kyc_submission_status" AS ENUM('under-review', 'more-information-required', 'rejected', 'accepted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "activity_status" AS ENUM('completed', 'in-progress');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kyc_level" (
	"level" "smallserial" PRIMARY KEY NOT NULL,
	"level_name" text,
	"order" smallint DEFAULT 0,
	"requirements" jsonb,
	CONSTRAINT "kyc_level_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kyc_submissions" (
	"submission_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"kyc_level" smallint,
	"attachments" jsonb,
	"remarks" text,
	"status" "kyc_submission_status",
	"audit_trail_log_id" uuid,
	"tracking_activity_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"password_hash" text NOT NULL,
	"phone_no" text,
	"is_verified" boolean DEFAULT false,
	"kyc_level" "smallserial" NOT NULL,
	"user_preferences" jsonb,
	"access_tokens" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_uid" uuid NOT NULL,
	"ip_address" text NOT NULL,
	"expire_at" timestamp,
	"last_active" timestamp,
	"status" "system_user_status",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracking_activity" (
	"activity_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activity_status" "activity_status" DEFAULT 'in-progress',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracking_logs" (
	"activity" uuid NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"transactions_completed" integer DEFAULT 0 NOT NULL,
	"total_ratings" numeric(2, 1) DEFAULT '0.00' NOT NULL,
	"avatar" text,
	"profile_description" text,
	"slug" text NOT NULL,
	CONSTRAINT "user_profile_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kyc_submissions" ADD CONSTRAINT "kyc_submissions_user_user_uid_fk" FOREIGN KEY ("user") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kyc_submissions" ADD CONSTRAINT "kyc_submissions_kyc_level_kyc_level_level_fk" FOREIGN KEY ("kyc_level") REFERENCES "kyc_level"("level") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kyc_submissions" ADD CONSTRAINT "kyc_submissions_audit_trail_log_id_audit_trail_log_id_fk" FOREIGN KEY ("audit_trail_log_id") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kyc_submissions" ADD CONSTRAINT "kyc_submissions_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_kyc_level_kyc_level_level_fk" FOREIGN KEY ("kyc_level") REFERENCES "kyc_level"("level") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_uid_user_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "user"("uid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tracking_logs" ADD CONSTRAINT "tracking_logs_activity_tracking_activity_activity_id_fk" FOREIGN KEY ("activity") REFERENCES "tracking_activity"("activity_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_uid_fk" FOREIGN KEY ("user_id") REFERENCES "user"("uid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
