import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";
extendZodWithOpenApi(z);

const c = initContract();

export const systemUserRouter = c.router(
  {
    create: {
      path: "/create",
      method: "POST",
      body: z.object({
        first_name: z.string().min(1),
        email: z.string().email("Must be a valid email").min(1),
        role_group: z.string(),
        last_name: z.string().min(1),
      }),
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    searchusers: {
      path: "/",
      method: "GET",
      query: z.object({ name_email: z.string() }),
      responses: {
        200: z.object({
          ...commonZodResponse,
          users: z.array(
            z.object({
              first_name: z.string(),
              last_name: z.string(),
              email: z.string().email(),
              joined_on: z.date(),
              avatar: z.string(),
            })
          ),
        }),
      },
    },
  },
  {
    pathPrefix: "/user",
    baseHeaders: z.object({
      // authorization: z.string().min(1, "Authentication token is required"),
    }),
  }
);
