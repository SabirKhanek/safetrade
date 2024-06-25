ALTER TABLE "user" ALTER COLUMN "kyc_level" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "kyc_level" DROP NOT NULL;