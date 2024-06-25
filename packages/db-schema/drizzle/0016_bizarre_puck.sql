ALTER TYPE "dummy_triggerr_schema_generate_enum" ADD VALUE 'seeding_kyc_levels';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "kyc_level" SET DEFAULT 0;
INSERT INTO "kyc_level" ("level", "level_name", "order", "requirements") 
VALUES (0, 'unverified', 0, '[]') 
ON CONFLICT ("level") DO NOTHING; -- statement-endpoint

INSERT INTO "kyc_level" ("level", "level_name", "order", "requirements") 
VALUES (1, 'Official ID', 1, '["National ID / Driving License"]') 
ON CONFLICT ("level") DO NOTHING; -- statement-endpoint

INSERT INTO "kyc_level" ("level", "level_name", "order", "requirements") 
VALUES (2, 'Face Verification', 2, '["Selfie Portrait with submission date"]') 
ON CONFLICT ("level") DO NOTHING; -- statement-endpoint

INSERT INTO "kyc_level" ("level", "level_name", "order", "requirements") 
VALUES (3, 'Address Verification', 3, '["Any proof of residence verification (utility bills)"]') 
ON CONFLICT ("level") DO NOTHING; -- statement-endpoint
