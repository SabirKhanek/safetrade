CREATE TABLE IF NOT EXISTS "chat_message" (
	"message" text NOT NULL,
	"sender" uuid NOT NULL,
	"thread_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_threads" (
	"thread_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_thread_participant" (
	"user_uid" uuid,
	"thread_id" uuid,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "chat_thread_participant_thread_id_user_uid_pk" PRIMARY KEY("thread_id","user_uid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_thread_participant" ADD CONSTRAINT "chat_thread_participant_user_uid_user_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_thread_participant" ADD CONSTRAINT "chat_thread_participant_thread_id_chat_threads_thread_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."chat_threads"("thread_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
