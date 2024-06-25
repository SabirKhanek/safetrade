export declare const Groups: {
    readonly RootGroup: string;
    readonly SupportStaff: "support_staff";
};
export declare const Permissions: {
    readonly ReadUserPermissions: "read_user_permissions";
    readonly UpdateUserPermissions: "update_user_permissions";
    readonly ReadGroupPermissions: "read_group_permissions";
    readonly UpdateGroupPermissions: "update_group_permissions";
    readonly AddUsers: "add_user";
    readonly RemoveUser: "remove_user";
    readonly ListUsers: "list_users";
    readonly ReadAuditTrails: "read_audit_trails";
};
export type GroupsType = (typeof Groups)[keyof typeof Groups];
export type PermissionsType = (typeof Permissions)[keyof typeof Permissions];
