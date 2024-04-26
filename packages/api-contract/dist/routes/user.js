"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.userRouter = c.router({
    create: {
        path: "/create",
        method: "POST",
        body: zod_1.z.object({
            first_name: zod_1.z.string().min(1),
            email: zod_1.z.string().email("Must be a valid email").min(1),
            last_name: zod_1.z.string().min(1),
        }),
        responses: {
            200: zod_1.z.object({ success: zod_1.z.boolean() }),
        },
    },
}, {
    pathPrefix: "/user",
    baseHeaders: zod_1.z.object({
        authorization: zod_1.z.string().min(1, "Authentication token is required"),
    }),
});
