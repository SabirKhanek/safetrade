import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { UserShortInfo } from "../utils/user";
import { commonZodResponse } from "../utils/common";

extendZodWithOpenApi(z);

const c = initContract();

export const audit = c.router(
  {
    getTrailDetails: {
      method: "GET",
      path: "/trail",
      query: z
        .object({
          trail_ids: z.array(z.string().optional()).optional().default([]),
          user_email: z.string().optional().default(""),
          take: z.number().default(50),
          skip: z.number().default(0),
        })
        .required(),
      responses: {
        200: z.object({
          data: z.array(
            z.object({
              performer: UserShortInfo,
              performed_at: z.date(),
              action_name: z.string(),
              metadata: z.unknown(),
              trail_id: z.string(),
            })
          ),
          total_available: z.number(),
        }),
      },
    },
  },
  { pathPrefix: "/audit" }
);
