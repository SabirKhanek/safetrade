import { z } from "zod";
export declare const authRouter: {
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
        path: "/auth/";
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
    validateToken: {
        method: "GET";
        headers: z.ZodObject<{
            authorization: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            authorization: string;
        }, {
            authorization: string;
        }>;
        path: "/auth/validate";
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
