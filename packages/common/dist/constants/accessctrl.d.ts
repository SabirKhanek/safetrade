export declare const Groups: {
    readonly RootGroup: string;
    readonly SupportStaff: "support_staff";
};
export declare const Permissions: {
    readonly ReadUserPermissions: "read_user_permissions";
    readonly UpdateUserPermissions: "update_user_permissions";
    readonly AddUsers: "add_user";
};
export type GroupsType = (typeof Groups)[keyof typeof Groups];
export type PermissionsType = (typeof Permissions)[keyof typeof Permissions];
