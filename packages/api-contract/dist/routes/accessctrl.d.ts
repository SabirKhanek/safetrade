import { z } from "zod";
export declare const accessCtrl: {
    getGroupsPermission: {
        query: z.ZodObject<{
            groupName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            groupName?: string | undefined;
        }, {
            groupName?: string | undefined;
        }>;
        method: "GET";
        path: "/accessctrl/group/permissions";
        responses: {
            200: z.ZodObject<{
                groups: z.ZodArray<z.ZodObject<{
                    group_name: z.ZodNativeEnum<{
                        readonly RootGroup: string;
                        readonly SupportStaff: "support_staff";
                    }>;
                    permissions: z.ZodArray<z.ZodNativeEnum<{
                        readonly ReadUserPermissions: "read_user_permissions";
                        readonly UpdateUserPermissions: "update_user_permissions";
                        readonly ReadGroupPermissions: "read_group_permissions";
                        readonly UpdateGroupPermissions: "update_group_permissions";
                        readonly AddUsers: "add_user";
                        readonly RemoveUser: "remove_user";
                        readonly ListUsers: "list_users";
                        readonly ReadAuditTrails: "read_audit_trails";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    group_name: string;
                }, {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    group_name: string;
                }>, "many">;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                groups: {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    group_name: string;
                }[];
            }, {
                message: string;
                success: boolean;
                groups: {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    group_name: string;
                }[];
            }>;
        };
    };
    updatePermissionsInGroup: {
        method: "PUT";
        body: z.ZodObject<{
            permissions: z.ZodArray<z.ZodNativeEnum<{
                readonly ReadUserPermissions: "read_user_permissions";
                readonly UpdateUserPermissions: "update_user_permissions";
                readonly ReadGroupPermissions: "read_group_permissions";
                readonly UpdateGroupPermissions: "update_group_permissions";
                readonly AddUsers: "add_user";
                readonly RemoveUser: "remove_user";
                readonly ListUsers: "list_users";
                readonly ReadAuditTrails: "read_audit_trails";
            }>, "many">;
            group: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
            group: string;
        }, {
            permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
            group: string;
        }>;
        path: "/accessctrl/group/permissions";
        responses: {
            200: z.ZodObject<{
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
            }, {
                message: string;
                success: boolean;
            }>;
        };
    };
    getUsersPermissions: {
        query: z.ZodObject<{
            user_name_or_email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            user_name_or_email: string;
        }, {
            user_name_or_email: string;
        }>;
        method: "GET";
        path: "/accessctrl/user/permissions";
        responses: {
            200: z.ZodObject<{
                users: z.ZodArray<z.ZodObject<{
                    user_email: z.ZodString;
                    user_f_name: z.ZodString;
                    permissions: z.ZodArray<z.ZodNativeEnum<{
                        readonly ReadUserPermissions: "read_user_permissions";
                        readonly UpdateUserPermissions: "update_user_permissions";
                        readonly ReadGroupPermissions: "read_group_permissions";
                        readonly UpdateGroupPermissions: "update_group_permissions";
                        readonly AddUsers: "add_user";
                        readonly RemoveUser: "remove_user";
                        readonly ListUsers: "list_users";
                        readonly ReadAuditTrails: "read_audit_trails";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    user_email: string;
                    user_f_name: string;
                }, {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    user_email: string;
                    user_f_name: string;
                }>, "many">;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                users: {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    user_email: string;
                    user_f_name: string;
                }[];
            }, {
                message: string;
                success: boolean;
                users: {
                    permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                    user_email: string;
                    user_f_name: string;
                }[];
            }>;
        };
    };
    updateUserPermissions: {
        method: "PUT";
        body: z.ZodObject<{
            permissions: z.ZodArray<z.ZodNativeEnum<{
                readonly ReadUserPermissions: "read_user_permissions";
                readonly UpdateUserPermissions: "update_user_permissions";
                readonly ReadGroupPermissions: "read_group_permissions";
                readonly UpdateGroupPermissions: "update_group_permissions";
                readonly AddUsers: "add_user";
                readonly RemoveUser: "remove_user";
                readonly ListUsers: "list_users";
                readonly ReadAuditTrails: "read_audit_trails";
            }>, "many">;
            user_uid: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
            user_uid: string;
        }, {
            permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
            user_uid: string;
        }>;
        path: "/accessctrl/user/permissions";
        responses: {
            200: z.ZodObject<{
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
            }, {
                message: string;
                success: boolean;
            }>;
        };
    };
};
