"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpHeader = exports.commonZodResponse = void 0;
var common_1 = require("common");
var zod_1 = require("zod");
exports.commonZodResponse = { success: zod_1.z.boolean(), message: zod_1.z.string() };
exports.otpHeader = (_a = {},
    _a[common_1.Headers.VerfiedOtpToken] = zod_1.z.string().min(1, "verified header is required"),
    _a);
