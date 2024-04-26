ALTER TABLE "user" RENAME COLUMN "username" TO "email";--> statement-breakpoint
ALTER TABLE "user_session" DROP CONSTRAINT "user_session_email_user_username_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_email_user_email_fk" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
