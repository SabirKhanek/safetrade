import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { boolean } from "drizzle-orm/mysql-core";
import { z } from "zod";
extendZodWithOpenApi(z);

const c = initContract();

export const userRouter = c.router(
  {
    create: {
      path: "/create",
      method: "POST",
      body: z.object({
        first_name: z.string().min(1),
        email: z.string().email("Must be a valid email").min(1),
        last_name: z.string().min(1),
      }),
      responses: {
        200: z.object({success: z.boolean()}),
      },
    },
  },
  {
    pathPrefix: "/user",
    baseHeaders: z.object({
      authorization: z.string().min(1, "Authentication token is required"),
    }),
  }
);
