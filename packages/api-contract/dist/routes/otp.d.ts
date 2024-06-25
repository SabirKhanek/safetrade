import { z } from "zod";
export declare const otp: {
    generate: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
        }, {
            email: string;
        }>;
        path: "/otp/generate";
        responses: {
            200: z.ZodObject<{
                otp_id: z.ZodString;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                otp_id: string;
            }, {
                message: string;
                success: boolean;
                otp_id: string;
            }>;
        };
    };
    resend: {
        method: "POST";
        body: z.ZodObject<{
            otp_id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            otp_id: string;
        }, {
            otp_id: string;
        }>;
        path: "/otp/resend";
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
    verify: {
        query: z.ZodObject<{
            otp: z.ZodString;
            otp_id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            otp_id: string;
            otp: string;
        }, {
            otp_id: string;
            otp: string;
        }>;
        method: "GET";
        path: "/otp/verify";
        responses: {
            200: z.ZodObject<{
                verified_token: z.ZodString;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
                verified_token: string;
            }, {
                message: string;
                success: boolean;
                verified_token: string;
            }>;
        };
    };
    test: {
        pathParams: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        method: "GET";
        headers: z.ZodObject<{
            "x-verified-otp-token": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "x-verified-otp-token": string;
        }, {
            "x-verified-otp-token": string;
        }>;
        path: "/otp/test";
        responses: {
            200: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        };
    };
};
