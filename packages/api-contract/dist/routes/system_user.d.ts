import { z } from "zod";
export declare const systemUserRouter: {
    create: {
        method: "POST";
        contentType: "multipart/form-data";
        body: z.ZodObject<{
            first_name: z.ZodString;
            email: z.ZodString;
            role_group: z.ZodString;
            last_name: z.ZodString;
            avatar: z.ZodOptional<z.ZodType<File, z.ZodTypeDef, File>>;
            permissions: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<{
                readonly ReadUserPermissions: "read_user_permissions";
                readonly UpdateUserPermissions: "update_user_permissions";
                readonly ReadGroupPermissions: "read_group_permissions";
                readonly UpdateGroupPermissions: "update_group_permissions";
                readonly AddUsers: "add_user";
                readonly RemoveUser: "remove_user";
                readonly ListUsers: "list_users";
                readonly ReadAuditTrails: "read_audit_trails";
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            first_name: string;
            role_group: string;
            last_name: string;
            avatar?: File | undefined;
            permissions?: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[] | undefined;
        }, {
            email: string;
            first_name: string;
            role_group: string;
            last_name: string;
            avatar?: File | undefined;
            permissions?: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[] | undefined;
        }>;
        headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        path: "/user/create";
        responses: {
            200: z.ZodObject<{
                success: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                success: boolean;
            }, {
                success: boolean;
            }>;
        };
    };
    remove: {
        method: "DELETE";
        body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        path: "/user/remove/:userId";
        responses: {
            200: z.ZodObject<{
                deleted: z.ZodBoolean;
                audit_log: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                deleted: boolean;
                audit_log: string;
            }, {
                deleted: boolean;
                audit_log: string;
            }>;
        };
    };
    searchusers: {
        query: z.ZodObject<{
            name_email: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            take: z.ZodDefault<z.ZodNumber>;
            skip: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name_email: string;
            take: number;
            skip: number;
        }, {
            name_email?: string | undefined;
            take?: number | undefined;
            skip?: number | undefined;
        }>;
        method: "GET";
        headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        path: "/user/";
        responses: {
            200: z.ZodObject<{
                data: z.ZodObject<{
                    users: z.ZodArray<z.ZodObject<{
                        first_name: z.ZodString;
                        last_name: z.ZodString;
                        email: z.ZodString;
                        joined_on: z.ZodDate;
                        avatar: z.ZodString;
                        creator: z.ZodObject<{
                            name: z.ZodString;
                            email: z.ZodString;
                            avatar: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            email: string;
                            avatar: string;
                            name: string;
                        }, {
                            email: string;
                            avatar: string;
                            name: string;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }>, "many">;
                    total_available: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }[];
                    total_available: number;
                }, {
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }[];
                    total_available: number;
                }>;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                data: {
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }[];
                    total_available: number;
                };
            }, {
                message: string;
                success: boolean;
                data: {
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        joined_on: Date;
                        creator: {
                            email: string;
                            avatar: string;
                            name: string;
                        };
                    }[];
                    total_available: number;
                };
            }>;
        };
    };
};
