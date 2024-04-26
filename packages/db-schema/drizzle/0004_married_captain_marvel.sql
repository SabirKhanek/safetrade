ALTER TABLE "user_session" RENAME COLUMN "username" TO "email";--> statement-breakpoint
ALTER TABLE "user_session" DROP CONSTRAINT "user_session_username_user_username_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_email_user_username_fk" FOREIGN KEY ("email") REFERENCES "user"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
