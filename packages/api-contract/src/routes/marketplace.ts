import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { schema } from "db-schema";
extendZodWithOpenApi(z);
const c = initContract();
export const marketplace = c.router(
  {
    createOffer: {
      path: "/offer",
      body: z.object({
        category: z.string(),
        title: z.string(),
        description: z.string(),
        short_description: z.string(),
        attachments: z
          .custom<File>()
          .optional()
          .openapi({ format: "binary", type: "string" }),
      }),
      responses: { 200: z.object({ success: z.boolean() }) },
      method: "POST",
      contentType: "multipart/form-data",
    },
  },
  { pathPrefix: "/marketplace" }
);
