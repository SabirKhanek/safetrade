DO $$ BEGIN
    CREATE TYPE "dummy_triggerr_schema_generate_enum" AS ENUM('seeding role_group');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    -- Insert into audit_trail
    INSERT INTO "audit_trail" (
        log_id, activity_data, activity_name, additional_meta, created_at, performed_by, updated_at
    ) VALUES (
        '37c0122f-2e1c-45e9-a134-6aed36ce3213', -- audit_trail_id for role creation
        '{"role": "root_user_group"}'::jsonb, -- example activity_data
        'create_role', -- example activity_name
        '{}'::jsonb, -- example additional_meta
        now(), -- current timestamp for created_at
        '6181199d-ba67-400a-bac3-0344c70a72b9', -- performed_by
        now() -- current timestamp for updated_at
    )
    ON CONFLICT (log_id) DO NOTHING; -- handle duplicates by doing nothing

    -- Insert into role_group
    INSERT INTO "role_group" (group_id, audit_trail_log_id, created_at)
    VALUES (
        'root_user_group', -- group_id for the root user group
        '37c0122f-2e1c-45e9-a134-6aed36ce3213', -- audit_trail_id for role creation
        now() -- current timestamp for created_at
    )
    ON CONFLICT (group_id) DO NOTHING; -- handle duplicates by doing nothing
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
