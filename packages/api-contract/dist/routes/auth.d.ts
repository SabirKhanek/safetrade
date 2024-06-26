import { z } from "zod";
import { PublicUserPayload } from "common";
export declare const userAuth: {
    signup: {
        method: "POST";
        body: z.ZodObject<{
            f_name: z.ZodString;
            l_name: z.ZodString;
            email: z.ZodString;
            dob: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            password: string;
            f_name: string;
            l_name: string;
            dob: string;
        }, {
            email: string;
            password: string;
            f_name: string;
            l_name: string;
            dob: string;
        }>;
        headers: z.ZodObject<{
            "x-verified-otp-token": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "x-verified-otp-token": string;
        }, {
            "x-verified-otp-token": string;
        }>;
        path: "/auth/register";
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
    logout: {
        method: "GET";
        path: "/auth/logout";
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
        path: "/auth/basic";
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
    me: {
        method: "GET";
        path: "/auth/me";
        responses: {
            200: z.ZodType<PublicUserPayload, z.ZodTypeDef, PublicUserPayload>;
        };
    };
    completeChallenge: {
        method: "POST";
        body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        headers: z.ZodObject<{
            "x-verified-otp-token": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "x-verified-otp-token": string;
        }, {
            "x-verified-otp-token": string;
        }>;
        path: "/auth/challenge";
        responses: {
            200: z.ZodObject<{
                token: z.ZodString;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                token: string;
                success: boolean;
            }, {
                message: string;
                token: string;
                success: boolean;
            }>;
        };
    };
    test: {
        method: "GET";
        path: "/auth/test";
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
    testdeferred: {
        method: "GET";
        path: "/auth/test/deferred";
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
