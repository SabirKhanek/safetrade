ALTER TABLE "system_permission_control" DROP CONSTRAINT "system_permission_control_uid_group_id_permission_unique";--> statement-breakpoint
ALTER TABLE "system_permission_control" ADD CONSTRAINT "user_permission_uk" UNIQUE("uid","permission");--> statement-breakpoint
ALTER TABLE "system_permission_control" ADD CONSTRAINT "group_permission_uk" UNIQUE("group_id","permission");-->statement-breakpoint
ALTER TABLE "system_permission_control" ALTER COLUMN "group_id" DROP NOT NULL;-->statement-breakpoint
ALTER TABLE "system_permission_control" ALTER COLUMN "uid" DROP NOT NULL;-->statement-breakpoint