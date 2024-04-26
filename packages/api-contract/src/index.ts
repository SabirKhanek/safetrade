import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { coerce, z } from "zod";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";

extendZodWithOpenApi(z);

const c = initContract();

export const contract = c.router(
  {
    user: userRouter,
    auth: authRouter,
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
    commonResponses: {
      404: c.type<{
        success: false;
        message: "resource not found";
        reason: any;
      }>(),
      500: c.type<{
        success: false;
        message: "internal server error";
        reason: any;
      }>(),
      400: c.type<{ success: false; message: "bad request"; reason: "" }>(),
      401: c.type<{ success: false; message: "unauthorized"; resason: any }>(),
      403: c.type<{ success: false; message: "forbidden"; reason: any }>(),
    },
  }
);

export const openApiDocument = generateOpenApi(contract, {
  info: { title: "SafeTrade API", version: "0.0.0" },
});
