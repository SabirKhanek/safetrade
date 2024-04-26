import { z } from "zod";
export declare const contract: {
    user: {
        create: {
            method: "POST";
            body: z.ZodObject<{
                first_name: z.ZodString;
                email: z.ZodString;
                last_name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                first_name: string;
                last_name: string;
            }, {
                email: string;
                first_name: string;
                last_name: string;
            }>;
            headers: z.ZodObject<{
                authorization: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                authorization: string;
            }, {
                authorization: string;
            }>;
            path: "/api/user/create";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: true;
        };
    };
    auth: {
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
            path: "/api/auth/";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    token: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
            };
            strictStatusCodes: true;
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
            path: "/api/auth/validate";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: true;
        };
    };
};
export declare const openApiDocument: import("openapi3-ts").OpenAPIObject;
