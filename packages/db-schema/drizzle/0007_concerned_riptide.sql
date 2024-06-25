CREATE TABLE IF NOT EXISTS "deposit" (
	"deposit_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid,
	"deposit_amount" bigint NOT NULL,
	"deposit_src" text NOT NULL,
	"deposit_details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"deposit_logs" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"deposit_verified_audit_log" uuid,
	"tracking_activity_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"txn_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_wallet" uuid NOT NULL,
	"to_wallet" uuid NOT NULL,
	"offer_id" uuid NOT NULL,
	"commision_amount" bigint,
	"transaction_amount" bigint,
	"misc_charges" jsonb,
	"transaction_status" "transaction_status" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	"tracking_activity_id" uuid NOT NULL,
	"additional_meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_audit_trail" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"txn_id" uuid NOT NULL,
	"transaction_snapshot" jsonb NOT NULL,
	"diff_summary" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallet" (
	"wallet_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uuid" uuid NOT NULL,
	"balance" bigint DEFAULT 0 NOT NULL,
	"unrealized_balance" uuid DEFAULT gen_random_uuid() NOT NULL,
	"wallet_audit_status" "wallet_audit_status" DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallet_activity" (
	"activity_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid NOT NULL,
	"activity_type" "wallet_activity_type" NOT NULL,
	"activity_reference" uuid NOT NULL,
	"amount" bigint NOT NULL,
	"activity_timestamp" timestamp,
	"activity_subject" text NOT NULL,
	"activity_status" "wallet_audit_status" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallet_audit_trail" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid NOT NULL,
	"wallet_snapshot" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "withdrawl" (
	"withdrawl_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid,
	"withdrawl_amount" bigint NOT NULL,
	"withdrawl_status" "withdrawl_status" DEFAULT 'received' NOT NULL,
	"withdrawl_logs" jsonb,
	"withdraw_destination_details" jsonb,
	"withdraw_processed_audit_log" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"tracking_activity_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deposit" ADD CONSTRAINT "deposit_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("wallet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deposit" ADD CONSTRAINT "deposit_deposit_verified_audit_log_audit_trail_log_id_fk" FOREIGN KEY ("deposit_verified_audit_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deposit" ADD CONSTRAINT "deposit_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_from_wallet_wallet_wallet_id_fk" FOREIGN KEY ("from_wallet") REFERENCES "wallet"("wallet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_wallet_wallet_wallet_id_fk" FOREIGN KEY ("to_wallet") REFERENCES "wallet"("wallet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_offer_id_sell_offer_offer_id_fk" FOREIGN KEY ("offer_id") REFERENCES "sell_offer"("offer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wallet" ADD CONSTRAINT "wallet_uuid_user_uid_fk" FOREIGN KEY ("uuid") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wallet_activity" ADD CONSTRAINT "wallet_activity_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("wallet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "withdrawl" ADD CONSTRAINT "withdrawl_wallet_id_wallet_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("wallet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "withdrawl" ADD CONSTRAINT "withdrawl_tracking_activity_id_tracking_activity_activity_id_fk" FOREIGN KEY ("tracking_activity_id") REFERENCES "tracking_activity"("activity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
