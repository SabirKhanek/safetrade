"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_openapi_1 = require("@anatine/zod-openapi");
var zod_1 = require("zod");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.default = zod_1.z;
