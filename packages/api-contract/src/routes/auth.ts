import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse, otpHeader } from "../utils/common";
extendZodWithOpenApi(z);

const c = initContract();

export const userAuth = c.router(
  {
    signup: {
      method: "POST",
      body: z.object({
        f_name: z.string().min(1),
        l_name: z.string().min(1),
        email: z.string().min(1).email(),
        dob: z.string().date(),
        password: z
          .string()
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            "Password should be at least 8 characters and contain 1 number, 1 uppercase letter and 1 lowercase letter"
          )
          .min(1),
      }),
      headers: z.object({ ...otpHeader }),
      path: "/register",
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
      },
    },
    login: {
      path: "/basic",
      method: "POST",
      body: z.object({
        email: z.string().min(1),
        password: z.string().min(1),
      }),
      responses: {
        200: z.object({
          token: z.string(),
        }),
      },
    },
    me: {
      method: "GET",
      path: "/me",
      responses: { 200: z.object({ ...commonZodResponse }) },
    },
    completeChallenge: {
      path: "/challenge",
      method: "POST",
      body: z.object({}),
      headers: z.object({ ...otpHeader }),
      responses: { 200: z.object({ ...commonZodResponse, token: z.string() }) },
    },
    test: {
      path: "/test",
      method: "GET",
      responses: { 200: z.object({ success: z.boolean() }) },
    },
    testdeferred: {
      path: "/test/deferred",
      method: "GET",
      responses: { 200: z.object({ success: z.boolean() }) },
    },
  },
  {
    pathPrefix: "/auth",
  }
);
