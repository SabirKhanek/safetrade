"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserShortInfo = void 0;
var zod_1 = require("zod");
exports.UserShortInfo = zod_1.z.object({
    avatar: zod_1.z.string(),
    first_name: zod_1.z.string().min(1),
    last_name: zod_1.z.string(),
    email: zod_1.z.string().min(1),
    user_uid: zod_1.z.string(),
});
