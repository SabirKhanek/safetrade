import { z } from "zod";
export declare const audit: {
    getTrailDetails: {
        query: z.ZodObject<{
            trail_ids: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodOptional<z.ZodString>, "many">>>;
            user_email: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            take: z.ZodDefault<z.ZodNumber>;
            skip: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            take: number;
            skip: number;
            trail_ids: (string | undefined)[];
            user_email: string;
        }, {
            take?: number | undefined;
            skip?: number | undefined;
            trail_ids?: (string | undefined)[] | undefined;
            user_email?: string | undefined;
        }>;
        method: "GET";
        path: "/audit/trail";
        responses: {
            200: z.ZodObject<{
                data: z.ZodArray<z.ZodObject<{
                    performer: z.ZodObject<{
                        avatar: z.ZodString;
                        first_name: z.ZodString;
                        last_name: z.ZodString;
                        email: z.ZodString;
                        user_uid: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    }, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    }>;
                    performed_at: z.ZodDate;
                    action_name: z.ZodString;
                    metadata: z.ZodUnknown;
                    trail_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    performer: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    };
                    performed_at: Date;
                    action_name: string;
                    trail_id: string;
                    metadata?: unknown;
                }, {
                    performer: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    };
                    performed_at: Date;
                    action_name: string;
                    trail_id: string;
                    metadata?: unknown;
                }>, "many">;
                total_available: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                data: {
                    performer: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    };
                    performed_at: Date;
                    action_name: string;
                    trail_id: string;
                    metadata?: unknown;
                }[];
                total_available: number;
            }, {
                data: {
                    performer: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        avatar: string;
                        user_uid: string;
                    };
                    performed_at: Date;
                    action_name: string;
                    trail_id: string;
                    metadata?: unknown;
                }[];
                total_available: number;
            }>;
        };
    };
};
