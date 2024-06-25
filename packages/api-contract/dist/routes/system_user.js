"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemUserRouter = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var common_1 = require("../utils/common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.systemUserRouter = c.router({
    create: {
        path: "/create",
        method: "POST",
        body: zod_1.z.object({
            first_name: zod_1.z.string().min(1),
            email: zod_1.z.string().email("Must be a valid email").min(1),
            role_group: zod_1.z.string(),
            last_name: zod_1.z.string().min(1),
        }),
        responses: {
            200: zod_1.z.object({ success: zod_1.z.boolean() }),
        },
    },
    searchusers: {
        path: "/",
        method: "GET",
        query: zod_1.z.object({ name_email: zod_1.z.string() }),
        responses: {
            200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { users: zod_1.z.array(zod_1.z.object({
                    first_name: zod_1.z.string(),
                    last_name: zod_1.z.string(),
                    email: zod_1.z.string().email(),
                    joined_on: zod_1.z.date(),
                    avatar: zod_1.z.string(),
                })) })),
        },
    },
}, {
    pathPrefix: "/user",
    baseHeaders: zod_1.z.object({
    // authorization: z.string().min(1, "Authentication token is required"),
    }),
});
