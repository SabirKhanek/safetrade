import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { coerce, z } from "zod";

extendZodWithOpenApi(z);

const c = initContract();

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  about: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;

export const contract = c.router(
  {
    user: {
      getAll: {
        path: "/user/getall",
        method: "GET",
        responses: {
          200: userSchema.omit({ password: true }).array(),
        },
      },
      get: {
        path: "/user/:id",
        pathParams: z.object({
          id: z.coerce.string(),
        }),
        method: "GET",
        responses: {
          200: userSchema.omit({ password: true }),
          404: z.object({
            details: z.string().min(1),
          }),
        },
      },
    },
  },
  { pathPrefix: "/api", strictStatusCodes: true }
);

export const openApiDocument = generateOpenApi(contract, {
  info: { title: "SafeTrade API", version: "0.0.0" },
});
