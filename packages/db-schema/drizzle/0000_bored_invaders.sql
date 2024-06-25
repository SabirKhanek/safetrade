DO $$ BEGIN
 CREATE TYPE "system_user_status" AS ENUM('active', 'expired', 'logged_out');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_trail" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"performed_by" uuid NOT NULL,
	"performer_deletion_snapshot" jsonb,
	"activity_data" jsonb,
	"activity_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_group" (
	"group_id" text PRIMARY KEY NOT NULL,
	"audit_trail_log_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_permission" (
	"permission" text PRIMARY KEY NOT NULL,
	"audit_trail_log_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_permission_control" (
	"permission" text NOT NULL,
	"uid" uuid,
	"group_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"audit_trail_log_id" uuid NOT NULL,
	CONSTRAINT "system_permission_control_permission_uid_group_id_pk" PRIMARY KEY("permission","uid","group_id")
);


--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_user" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"password_hash" text NOT NULL,
	"last_name" text NOT NULL,
	"role_group" text,
	"access_tokens" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"audit_trail_log_id" uuid NOT NULL,
	CONSTRAINT "system_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_user_session" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_uid" uuid NOT NULL,
	"ip_address" text NOT NULL,
	"expire_at" timestamp,
	"last_active" timestamp,
	"status" "system_user_status",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_group" ADD CONSTRAINT "role_group_audit_trail_log_id_audit_trail_log_id_fk" FOREIGN KEY ("audit_trail_log_id") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_permission" ADD CONSTRAINT "system_permission_audit_trail_log_id_audit_trail_log_id_fk" FOREIGN KEY ("audit_trail_log_id") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_permission_control" ADD CONSTRAINT "system_permission_control_permission_system_permission_permission_fk" FOREIGN KEY ("permission") REFERENCES "system_permission"("permission") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_permission_control" ADD CONSTRAINT "system_permission_control_uid_system_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "system_user"("uid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_permission_control" ADD CONSTRAINT "system_permission_control_group_id_role_group_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "role_group"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_permission_control" ADD CONSTRAINT "system_permission_control_audit_trail_log_id_audit_trail_log_id_fk" FOREIGN KEY ("audit_trail_log_id") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_user" ADD CONSTRAINT "system_user_role_group_role_group_group_id_fk" FOREIGN KEY ("role_group") REFERENCES "role_group"("group_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_user" ADD CONSTRAINT "system_user_audit_trail_log_id_audit_trail_log_id_fk" FOREIGN KEY ("audit_trail_log_id") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_user_session" ADD CONSTRAINT "system_user_session_system_uid_system_user_uid_fk" FOREIGN KEY ("system_uid") REFERENCES "system_user"("uid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
