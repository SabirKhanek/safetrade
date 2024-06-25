import { z } from "zod";
export declare const userRouter: {
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
};
