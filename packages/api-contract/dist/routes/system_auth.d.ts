import { z } from "zod";
export declare const systemAuthRouter: {
    login: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            password: string;
        }, {
            email: string;
            password: string;
        }>;
        path: "/system/auth/";
        responses: {
            200: z.ZodObject<{
                token: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token: string;
            }, {
                token: string;
            }>;
        };
    };
    logout: {
        method: "GET";
        path: "/system/auth/logout";
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
    getAuthUser: {
        method: "GET";
        path: "/system/auth/me";
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
};
