"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audit = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var user_1 = require("../utils/user");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.audit = c.router({
    getTrailDetails: {
        method: "GET",
        path: "/trail",
        query: zod_1.z
            .object({
            trail_ids: zod_1.z.array(zod_1.z.string().optional()).optional().default([]),
            user_email: zod_1.z.string().optional().default(""),
            take: zod_1.z.number().default(50),
            skip: zod_1.z.number().default(0),
        })
            .required(),
        responses: {
            200: zod_1.z.object({
                data: zod_1.z.array(zod_1.z.object({
                    performer: user_1.UserShortInfo,
                    performed_at: zod_1.z.date(),
                    action_name: zod_1.z.string(),
                    metadata: zod_1.z.unknown(),
                    trail_id: zod_1.z.string(),
                })),
                total_available: zod_1.z.number(),
            }),
        },
    },
}, { pathPrefix: "/audit" });
