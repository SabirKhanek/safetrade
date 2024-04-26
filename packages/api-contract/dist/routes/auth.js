"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.authRouter = c.router({
    login: {
        path: "/",
        method: "POST",
        body: zod_1.z.object({
            email: zod_1.z
                .string()
                .email("Valid email is required")
                .min(1, "Email is required field"),
            password: zod_1.z.string().min(1, "Password is required field"),
        }),
        responses: {
            200: zod_1.z.object({
                token: zod_1.z.string().min(1),
            }),
        },
    },
    validateToken: {
        path: "/validate",
        method: "GET",
        headers: zod_1.z.object({
            authorization: zod_1.z
                .string()
                .min(1, "token not provided")
                .openapi({ description: "Authentication token" }),
        }),
        responses: { 200: zod_1.z.object({ success: zod_1.z.boolean() }) },
    },
}, {
    pathPrefix: "/auth",
});
