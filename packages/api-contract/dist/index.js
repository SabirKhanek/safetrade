"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = exports.contract = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var open_api_1 = require("@ts-rest/open-api");
var zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
var userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    about: zod_1.z.string().min(1),
});
exports.contract = c.router({
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
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.string(),
            }),
            method: "GET",
            responses: {
                200: userSchema.omit({ password: true }),
                404: zod_1.z.object({
                    details: zod_1.z.string().min(1),
                }),
            },
        },
    },
}, { pathPrefix: "/api", strictStatusCodes: true });
exports.openApiDocument = (0, open_api_1.generateOpenApi)(exports.contract, {
    info: { title: "SafeTrade API", version: "0.0.0" },
});
