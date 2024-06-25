import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { coerce, z } from "zod";
import { systemAuthRouter } from "./routes/system_auth";
import { systemUserRouter } from "./routes/system_user";
import { userAuth } from "./routes/auth";
import { otp } from "./routes/otp";
import { audit } from "./routes/audit";
import { accessCtrl } from "./routes/accessctrl";
extendZodWithOpenApi(z);

const c = initContract();

export const contract = c.router(
  {
    system_user: systemUserRouter,
    system_auth: systemAuthRouter,
    audit: audit,
    accessctrl: accessCtrl,
    // accessctrl: undefined,
    auth: userAuth,
    otp: otp,
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: false,
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

export const openApiDocument = generateOpenApi(
  contract,
  {
    info: { title: "SafeTrade API", version: "0.0.0" },
  },
  {}
);
