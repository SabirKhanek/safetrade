import { z } from "zod";
export declare const accessCtrl: {
    getGroupsPermission: {
        query: z.ZodObject<{
            groupName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            groupName: string;
        }, {
            groupName: string;
        }>;
        method: "GET";
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
    updatePermissionsInGroup: {
        method: "PUT";
        body: z.ZodObject<{
            permissions: z.ZodArray<z.ZodString, "many">;
            group: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            permissions: string[];
            group: string;
        }, {
            permissions: string[];
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
    addUsersToGroup: {
        method: "POST";
        body: z.ZodObject<{
            users: z.ZodArray<z.ZodString, "many">;
            group: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            users: string[];
            group: string;
        }, {
            users: string[];
            group: string;
        }>;
        path: "/accessctrl/group/addusers";
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
