"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketplace = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.marketplace = c.router({
    createOffer: {
        path: "/offer",
        body: zod_1.z.object({
            category: zod_1.z.string(),
            title: zod_1.z.string(),
            description: zod_1.z.string(),
            price: zod_1.z.string(),
            short_description: zod_1.z.string(),
            attachments: zod_1.z
                .custom()
                .openapi({ format: "binary", type: "string" }),
        }),
        responses: { 200: zod_1.z.object({ success: zod_1.z.boolean() }) },
        method: "POST",
        contentType: "multipart/form-data",
    },
}, { pathPrefix: "/marketplace" });
