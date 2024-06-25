import { z } from "zod";
export declare const systemUserRouter: {
    create: {
        method: "POST";
        body: z.ZodObject<{
            first_name: z.ZodString;
            email: z.ZodString;
            role_group: z.ZodString;
            last_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            first_name: string;
            role_group: string;
            last_name: string;
        }, {
            email: string;
            first_name: string;
            role_group: string;
            last_name: string;
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
    searchusers: {
        query: z.ZodObject<{
            name_email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name_email: string;
        }, {
            name_email: string;
        }>;
        method: "GET";
        headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        path: "/user/";
        responses: {
            200: z.ZodObject<{
                users: z.ZodArray<z.ZodObject<{
                    first_name: z.ZodString;
                    last_name: z.ZodString;
                    email: z.ZodString;
                    joined_on: z.ZodDate;
                    avatar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    email: string;
                    first_name: string;
                    last_name: string;
                    joined_on: Date;
                    avatar: string;
                }, {
                    email: string;
                    first_name: string;
                    last_name: string;
                    joined_on: Date;
                    avatar: string;
                }>, "many">;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                users: {
                    email: string;
                    first_name: string;
                    last_name: string;
                    joined_on: Date;
                    avatar: string;
                }[];
            }, {
                message: string;
                success: boolean;
                users: {
                    email: string;
                    first_name: string;
                    last_name: string;
                    joined_on: Date;
                    avatar: string;
                }[];
            }>;
        };
    };
};
