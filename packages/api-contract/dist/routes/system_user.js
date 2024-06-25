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
var common_2 = require("common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.systemUserRouter = c.router({
    create: {
        path: "/create",
        method: "POST",
        contentType: "multipart/form-data",
        body: zod_1.z.object({
            first_name: zod_1.z.string().min(1, "First name is required"),
            email: zod_1.z.string().email("Must be a valid email").min(1),
            role_group: zod_1.z.string(),
            last_name: zod_1.z.string().min(1, "Last name is required"),
            avatar: zod_1.z
                .custom()
                .optional()
                .openapi({ format: "binary", type: "string" }),
            permissions: zod_1.z.array(zod_1.z.nativeEnum(common_2.Permissions)).optional(),
        }),
        responses: {
            200: zod_1.z.object({ success: zod_1.z.boolean() }),
        },
    },
    remove: {
        path: "/remove/:userId",
        method: "DELETE",
        body: zod_1.z.object({}),
        responses: {
            200: zod_1.z.object({ deleted: zod_1.z.boolean(), audit_log: zod_1.z.string().uuid() }),
        },
    },
    searchusers: {
        path: "/",
        method: "GET",
        query: zod_1.z.object({
            name_email: zod_1.z.string().optional().default(""),
            take: zod_1.z.number().default(50),
            skip: zod_1.z.number().default(0),
        }),
        responses: {
            200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { data: zod_1.z.object({
                    users: zod_1.z.array(zod_1.z.object({
                        first_name: zod_1.z.string(),
                        last_name: zod_1.z.string(),
                        email: zod_1.z.string().email(),
                        joined_on: zod_1.z.date(),
                        avatar: zod_1.z.string(),
                        creator: zod_1.z.object({
                            name: zod_1.z.string(),
                            email: zod_1.z.string(),
                            avatar: zod_1.z.string(),
                        }),
                    })),
                    total_available: zod_1.z.number(),
                }) })),
        },
    },
}, {
    pathPrefix: "/user",
    baseHeaders: zod_1.z.object({
    // authorization: z.string().min(1, "Authentication token is required"),
    }),
});
