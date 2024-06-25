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
exports.userAuth = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var common_1 = require("../utils/common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.userAuth = c.router({
    signup: {
        method: "POST",
        body: zod_1.z.object({
            f_name: zod_1.z.string().min(1),
            l_name: zod_1.z.string().min(1),
            email: zod_1.z.string().min(1).email(),
            dob: zod_1.z.string().date(),
            password: zod_1.z
                .string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password should be at least 8 characters and contain 1 number, 1 uppercase letter and 1 lowercase letter")
                .min(1),
        }),
        headers: zod_1.z.object(__assign({}, common_1.otpHeader)),
        path: "/register",
        responses: {
            200: zod_1.z.object({ success: zod_1.z.boolean(), message: zod_1.z.string() }),
        },
    },
    login: {
        path: "/basic",
        method: "POST",
        body: zod_1.z.object({
            email: zod_1.z.string().min(1),
            password: zod_1.z.string().min(1),
        }),
        responses: {
            200: zod_1.z.object({
                token: zod_1.z.string(),
            }),
        },
    },
    me: {
        method: "GET",
        path: "/me",
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
    },
    completeChallenge: {
        path: "/challenge",
        method: "POST",
        body: zod_1.z.object({}),
        headers: zod_1.z.object(__assign({}, common_1.otpHeader)),
        responses: { 200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { token: zod_1.z.string() })) },
    },
    test: {
        path: "/test",
        method: "GET",
        responses: { 200: zod_1.z.object({ success: zod_1.z.boolean() }) },
    },
    testdeferred: {
        path: "/test/deferred",
        method: "GET",
        responses: { 200: zod_1.z.object({ success: zod_1.z.boolean() }) },
    },
}, {
    pathPrefix: "/auth",
});
