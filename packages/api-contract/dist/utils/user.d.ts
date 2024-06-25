import { z } from "zod";
export declare const UserShortInfo: z.ZodObject<{
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
