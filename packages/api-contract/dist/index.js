"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = exports.contract = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var open_api_1 = require("@ts-rest/open-api");
var zod_1 = require("zod");
var auth_1 = require("./routes/auth");
var user_1 = require("./routes/user");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.contract = c.router({
    user: user_1.userRouter,
    auth: auth_1.authRouter,
}, {
    pathPrefix: "/api",
    strictStatusCodes: true,
    commonResponses: {
        404: c.type(),
        500: c.type(),
        400: c.type(),
        401: c.type(),
        403: c.type(),
    },
});
exports.openApiDocument = (0, open_api_1.generateOpenApi)(exports.contract, {
    info: { title: "SafeTrade API", version: "0.0.0" },
});
