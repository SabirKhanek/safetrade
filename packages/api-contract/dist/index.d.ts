import { z } from "zod";
declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    about: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    about: string;
}, {
    username: string;
    password: string;
    about: string;
}>;
export type User = z.infer<typeof userSchema>;
export declare const contract: {
    user: {
        getAll: {
            responses: {
                200: z.ZodArray<z.ZodObject<Omit<{
                    username: z.ZodString;
                    password: z.ZodString;
                    about: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    about: string;
                }, {
                    username: string;
                    about: string;
                }>, "many">;
            };
            method: "GET";
            path: "/api/user/getall";
            strictStatusCodes: true;
        };
        get: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            responses: {
                200: z.ZodObject<Omit<{
                    username: z.ZodString;
                    password: z.ZodString;
                    about: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    about: string;
                }, {
                    username: string;
                    about: string;
                }>;
                404: z.ZodObject<{
                    details: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    details: string;
                }, {
                    details: string;
                }>;
            };
            method: "GET";
            path: "/api/user/:id";
            strictStatusCodes: true;
        };
    };
};
export declare const openApiDocument: import("openapi3-ts").OpenAPIObject;
export {};
