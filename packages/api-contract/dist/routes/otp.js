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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var common_1 = require("../utils/common");
var common_2 = require("common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.otp = c.router({
    generate: {
        path: "/generate",
        body: zod_1.z.object({ email: zod_1.z.string().email() }),
        method: "POST",
        responses: {
            200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { otp_id: zod_1.z.string().min(1) })),
        },
    },
    resend: {
        path: "/resend",
        method: "POST",
        body: zod_1.z.object({ otp_id: zod_1.z.string().min(1) }),
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
    },
    verify: {
        path: "/verify",
        method: "GET",
        query: zod_1.z.object({
            otp: zod_1.z.string().length(6),
            otp_id: zod_1.z.string().min(1),
        }),
        responses: {
            200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { verified_token: zod_1.z.string().min(1) })),
        },
    },
    test: {
        path: "/test",
        method: "GET",
        pathParams: zod_1.z.object({}),
        headers: zod_1.z.object((_a = {},
            _a[common_2.Headers.VerfiedOtpToken] = zod_1.z
                .string()
                .min(1, "verified header is required"),
            _a)),
        responses: { 200: zod_1.z.object({}) },
    },
}, { pathPrefix: "/otp" });
