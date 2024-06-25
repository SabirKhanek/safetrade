import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { UserPayload } from "common";
import { boolean } from "drizzle-orm/mysql-core";
import { z } from "zod";
extendZodWithOpenApi(z);

const c = initContract();

export const systemAuthRouter = c.router(
  {
    login: {
      path: "/",
      method: "POST",
      body: z.object({
        email: z
          .string()
          .email("Valid email is required")
          .min(1, "Email is required field"),
        password: z.string().min(1, "Password is required field"),
      }),
      responses: {
        200: z.object({
          token: z.string().min(1),
        }),
      },
    },
    logout: {
      path: "/logout",
      method: "GET",
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    getAuthUser: {
      path: "/me",
      method: "GET",
      responses: {
        200: z.object({
          success: z.boolean(),
          token: z.string(),
          user: z.custom<UserPayload>().openapi({ type: "object" }),
        }),
      },
    },
  },
  {
    pathPrefix: "/system/auth",
  }
);
