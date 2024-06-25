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
exports.accessCtrl = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var common_1 = require("../utils/common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.accessCtrl = c.router({
    getGroupsPermission: {
        path: "/group/permissions",
        query: zod_1.z.object({ groupName: zod_1.z.string() }),
        method: "GET",
        responses: {
            200: zod_1.z.object(__assign({}, common_1.commonZodResponse)),
        },
    },
    updatePermissionsInGroup: {
        path: "/group/permissions",
        method: "PUT",
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
        body: zod_1.z.object({
            permissions: zod_1.z
                .array(zod_1.z.string().min(1))
                .min(1, "At least 1 permission should be given"),
            group: zod_1.z.string().min(1),
        }),
    },
    getUsersPermissions: {
        path: "/user/permissions",
        method: "GET",
        query: zod_1.z.object({ user_name_or_email: zod_1.z.string() }),
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
    },
    addUsersToGroup: {
        path: "/group/addusers",
        method: "POST",
        body: zod_1.z.object({
            users: zod_1.z.array(zod_1.z.string().email().min(1)),
            group: zod_1.z.string().min(1),
        }),
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
    },
}, { pathPrefix: "/accessctrl" });
