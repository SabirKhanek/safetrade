import { z } from "zod";
export declare const commonZodResponse: {
    success: z.ZodBoolean;
    message: z.ZodString;
};
export declare const otpHeader: {
    "x-verified-otp-token": z.ZodString;
};
