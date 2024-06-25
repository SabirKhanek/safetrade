"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = exports.contract = void 0;
var zod_openapi_1 = require("@anatine/zod-openapi");
var core_1 = require("@ts-rest/core");
var open_api_1 = require("@ts-rest/open-api");
var zod_1 = require("zod");
var system_auth_1 = require("./routes/system_auth");
var system_user_1 = require("./routes/system_user");
var auth_1 = require("./routes/auth");
var otp_1 = require("./routes/otp");
var audit_1 = require("./routes/audit");
var accessctrl_1 = require("./routes/accessctrl");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
var c = (0, core_1.initContract)();
exports.contract = c.router({
    system_user: system_user_1.systemUserRouter,
    system_auth: system_auth_1.systemAuthRouter,
    audit: audit_1.audit,
    accessctrl: accessctrl_1.accessCtrl,
    // accessctrl: undefined,
    auth: auth_1.userAuth,
    otp: otp_1.otp,
}, {
    pathPrefix: "/api",
    strictStatusCodes: false,
    commonResponses: {
        404: c.type(),
        500: c.type(),
        400: c.type(),
        401: c.type(),
        403: c.type(),
    },
});
exports.openApiDocument = (0, open_api_1.generateOpenApi)(exports.contract, {
    info: { title: "SafeTrade API", version: "0.0.0" },
}, {});
