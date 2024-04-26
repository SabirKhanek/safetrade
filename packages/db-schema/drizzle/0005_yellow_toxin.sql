ALTER TABLE "user_session" ADD PRIMARY KEY ("session_id");--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "session_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_session" ALTER COLUMN "email" SET NOT NULL;