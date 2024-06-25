CREATE TABLE IF NOT EXISTS "magiclinks" (
	"magicstring" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expire_at" timestamp DEFAULT NOW() + INTERVAL '10 minutes',
	"used" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "wallet" RENAME COLUMN "uuid" TO "user_id";--> statement-breakpoint
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_uuid_user_uid_fk";
--> statement-breakpoint
ALTER TABLE "system_permission_control" DROP CONSTRAINT "system_permission_control_permission_uid_group_id_pk";--> statement-breakpoint
ALTER TABLE "system_user_session" ALTER COLUMN "last_active" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wallet" DROP COLUMN "unrealized_balance";--> statement-breakpoint
ALTER TABLE "wallet" ADD COLUMN "unrealized_balance" bigint;--> statement-breakpoint
ALTER TABLE "wallet" ALTER COLUMN "unrealized_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "system_permission_control" ADD COLUMN "control_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "system_user_session" ADD COLUMN "additional_meta" jsonb;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_onboarded" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_user_uid_fk" FOREIGN KEY ("user_id") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "system_permission_control" ADD CONSTRAINT "system_permission_control_uid_group_id_permission_unique" UNIQUE("uid","group_id","permission");