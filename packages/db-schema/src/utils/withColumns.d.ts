export declare function withTimestamps<T>(schema: T): T & {
    created_at: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>;
    updated_at: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"updated_at">>;
};
export declare function withCreatedAt<T>(schema: T): T & {
    created_at: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>;
};
export declare function withDeletedAt<T>(schema: T): T & {
    deleted_at: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"deleted_at">>;
};
export declare function withAdditionalMeta<T>(schema: T): T & {
    additional_meta: import("drizzle-orm/pg-core").PgJsonbBuilderInitial<"additional_meta">;
};
export declare function withAuditTrailLog<T>(schema: T, nullable?: boolean): T & {
    audit_trail_logs: import("drizzle-orm/pg-core").PgUUIDBuilderInitial<"audit_trail_log_id">;
};
export declare function withAuditTrailLogs<T>(schema: T, nullable?: boolean): T & {
    audit_trail_logs: import("drizzle-orm").HasDefault<import("drizzle-orm").$Type<import("drizzle-orm/pg-core").PgJsonbBuilderInitial<"audit_trail_logs">, string[]>>;
};
export declare function withUserTrailLog<T>(schema: T, nullable?: boolean): T & {
    user_activity_trail_log: import("drizzle-orm/pg-core").PgUUIDBuilderInitial<"user_activity_trail_log">;
};
export declare function withUserTrailLogs<T>(schema: T, nullable?: boolean): T & {
    user_activity_trail_logs: import("drizzle-orm").HasDefault<import("drizzle-orm").$Type<import("drizzle-orm/pg-core").PgJsonbBuilderInitial<"user_activity_trail_logs">, string[]>>;
};
export declare function withTrackingActivity<T>(schema: T, nullable?: boolean): T & {
    tracking_activity_id: import("drizzle-orm/pg-core").PgUUIDBuilderInitial<"tracking_activity_id">;
};
