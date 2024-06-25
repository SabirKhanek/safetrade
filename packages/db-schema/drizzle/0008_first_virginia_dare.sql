ALTER TABLE "deposit" ALTER COLUMN "wallet_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "withdrawl" ALTER COLUMN "wallet_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "withdrawl" ADD CONSTRAINT "withdrawl_withdraw_processed_audit_log_audit_trail_log_id_fk" FOREIGN KEY ("withdraw_processed_audit_log") REFERENCES "audit_trail"("log_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
