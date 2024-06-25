ALTER TABLE "seller_reviews" DROP CONSTRAINT "seller_reviews_profile_id_user_uid_fk";
--> statement-breakpoint
ALTER TABLE "seller_reviews" DROP CONSTRAINT "seller_reviews_reviewer_user_uid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller_reviews" ADD CONSTRAINT "seller_reviews_profile_id_user_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "user_profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller_reviews" ADD CONSTRAINT "seller_reviews_reviewer_user_profile_user_id_fk" FOREIGN KEY ("reviewer") REFERENCES "user_profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
