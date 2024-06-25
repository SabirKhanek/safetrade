import { Headers } from "common";
import { z } from "zod";

export const commonZodResponse = { success: z.boolean(), message: z.string() };
export const otpHeader = {
  [Headers.VerfiedOtpToken]: z.string().min(1, "verified header is required"),
};