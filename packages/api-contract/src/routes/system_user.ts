import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";
import { Permissions } from "common";
extendZodWithOpenApi(z);

const c = initContract();

export const systemUserRouter = c.router(
  {
    create: {
      path: "/create",
      method: "POST",
      contentType: "multipart/form-data",
      body: z.object({
        first_name: z.string().min(1, "First name is required"),
        email: z.string().email("Must be a valid email").min(1),
        role_group: z.string(),
        last_name: z.string().min(1, "Last name is required"),
        avatar: z
          .custom<File>()
          .optional()
          .openapi({ format: "binary", type: "string" }),
        permissions: z.array(z.nativeEnum(Permissions)).optional(),
      }),
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    remove: {
      path: "/remove/:userId",
      method: "DELETE",
      body: z.object({}),
      responses: {
        200: z.object({ deleted: z.boolean(), audit_log: z.string().uuid() }),
      },
    },
    searchusers: {
      path: "/",
      method: "GET",
      query: z.object({
        name_email: z.string().optional().default(""),
        take: z.number().default(50),
        skip: z.number().default(0),
      }),
      responses: {
        200: z.object({
          ...commonZodResponse,
          data: z.object({
            users: z.array(
              z.object({
                first_name: z.string(),
                last_name: z.string(),
                email: z.string().email(),
                joined_on: z.date(),
                avatar: z.string(),
                creator: z.object({
                  name: z.string(),
                  email: z.string(),
                  avatar: z.string(),
                }),
              })
            ),
            total_available: z.number(),
          }),
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
