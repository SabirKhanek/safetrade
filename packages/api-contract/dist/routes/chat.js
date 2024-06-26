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
exports.chat = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var common_1 = require("../utils/common");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.chat = c.router({
    initThread: {
        body: zod_1.z.object({ participant: zod_1.z.string().email() }),
        path: "/initThread",
        method: "POST",
        responses: {
            200: zod_1.z.object(__assign(__assign({}, common_1.commonZodResponse), { thread_id: zod_1.z.string().uuid() })),
        },
    },
    sendMessge: {
        body: zod_1.z.object({ message: zod_1.z.string(), thread_id: zod_1.z.string().uuid() }),
        path: "/send",
        method: "POST",
        responses: { 200: zod_1.z.object(__assign({}, common_1.commonZodResponse)) },
    },
    getThreads: {
        path: "/get-threads",
        method: "GET",
        responses: {
            200: zod_1.z.array(zod_1.z.object({
                thread_id: zod_1.z.string().uuid(),
                other_user_name: zod_1.z.string(),
                other_user_uid: zod_1.z.string().uuid(),
                last_message: zod_1.z
                    .object({
                    message_id: zod_1.z.string(),
                    sender_name: zod_1.z.string(),
                    message_content: zod_1.z.string(),
                    created_at: zod_1.z.date(),
                })
                    .nullable(),
                other_user_avatar: zod_1.z.string().optional(), // Adjust to the actual type of avatar
            })),
        },
    },
    getMessagesInThread: {
        method: "GET",
        path: "/get-messages-in-thread",
        query: zod_1.z.object({ thread_id: zod_1.z.string().uuid() }),
        responses: {
            200: zod_1.z.object({
                messages: zod_1.z.array(zod_1.z.object({
                    message_id: zod_1.z.string(),
                    message: zod_1.z.string(),
                    created_at: zod_1.z.date(),
                    sender: zod_1.z.object({
                        name: zod_1.z.string(),
                        avatar: zod_1.z.string().optional(), // Adjust to the actual type of avatar
                    }),
                })),
                thread: zod_1.z.object({
                    thread_id: zod_1.z.string().uuid(),
                    other_user_name: zod_1.z.string(),
                    other_user_uid: zod_1.z.string().uuid(),
                    last_message: zod_1.z
                        .object({
                        message_id: zod_1.z.string(),
                        sender_name: zod_1.z.string(),
                        message_content: zod_1.z.string(),
                        created_at: zod_1.z.date(),
                    })
                        .nullable(),
                    other_user_avatar: zod_1.z.string().optional(), // Adjust to the actual type of avatar
                }),
            }),
        },
    },
}, { pathPrefix: "/chat" });
