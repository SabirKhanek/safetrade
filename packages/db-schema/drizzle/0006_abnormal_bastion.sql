ALTER TABLE "device_model" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "ticket_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "session_id" SET DEFAULT gen_random_uuid();