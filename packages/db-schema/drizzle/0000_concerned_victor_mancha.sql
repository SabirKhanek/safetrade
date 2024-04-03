CREATE TABLE IF NOT EXISTS "user" (
	"username" text PRIMARY KEY NOT NULL,
	"password" text,
	"about" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
