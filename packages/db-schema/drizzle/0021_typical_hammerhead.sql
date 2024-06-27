ALTER TABLE "deposit" DROP CONSTRAINT "deposit_tracking_activity_id_tracking_activity_activity_id_fk";
--> statement-breakpoint
ALTER TABLE "deposit" DROP COLUMN IF EXISTS "tracking_activity_id";