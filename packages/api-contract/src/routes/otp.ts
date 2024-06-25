import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";
import { Headers } from "common";
extendZodWithOpenApi(z);

const c = initContract();

export const otp = c.router(
  {
    generate: {
      path: "/generate",
      body: z.object({ email: z.string().email() }),
      method: "POST",
      responses: {
        200: z.object({ ...commonZodResponse, otp_id: z.string().min(1) }),
      },
    },
    resend: {
      path: "/resend",
      method: "POST",
      body: z.object({ otp_id: z.string().min(1) }),
      responses: { 200: z.object({ ...commonZodResponse }) },
    },
    verify: {
      path: "/verify",
      method: "GET",
      query: z.object({
        otp: z.string().length(6),
        otp_id: z.string().min(1),
      }),
      responses: {
        200: z.object({
          ...commonZodResponse,
          verified_token: z.string().min(1),
        }),
      },
    },
    test: {
      path: "/test",
      method: "GET",
      pathParams: z.object({}),
      headers: z.object({
        [Headers.VerfiedOtpToken]: z
          .string()
          .min(1, "verified header is required"),
      }),
      responses: { 200: z.object({}) },
    },
  },
  { pathPrefix: "/otp" }
);
