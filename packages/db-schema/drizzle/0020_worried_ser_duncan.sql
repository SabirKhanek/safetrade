ALTER TABLE "sell_offer" ADD COLUMN "price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "sell_offer" ADD COLUMN "slug" text;