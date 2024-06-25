"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.withTrackingActivity = exports.withUserTrailLogs = exports.withUserTrailLog = exports.withAuditTrailLogs = exports.withAuditTrailLog = exports.withAdditionalMeta = exports.withDeletedAt = exports.withCreatedAt = exports.withTimestamps = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var schema_1 = require("../schema");
var drizzle_orm_1 = require("drizzle-orm");
function withTimestamps(schema) {
    var props = {
        created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
        updated_at: (0, pg_core_1.timestamp)("updated_at", {
            mode: "date",
            precision: 3,
        }).$onUpdate(function () { return new Date(); }),
    };
    return __assign(__assign({}, schema), props);
}
exports.withTimestamps = withTimestamps;
function withCreatedAt(schema) {
    var props = {
        created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    };
    return __assign(__assign({}, schema), props);
}
exports.withCreatedAt = withCreatedAt;
function withDeletedAt(schema) {
    var props = {
        deleted_at: (0, pg_core_1.timestamp)("deleted_at").default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["NULL"], ["NULL"])))),
    };
    return __assign(__assign({}, schema), props);
}
exports.withDeletedAt = withDeletedAt;
function withAdditionalMeta(schema) {
    var props = {
        additional_meta: (0, pg_core_1.jsonb)("additional_meta"),
    };
    return __assign(__assign({}, schema), props);
}
exports.withAdditionalMeta = withAdditionalMeta;
function withAuditTrailLog(schema, nullable) {
    if (nullable === void 0) { nullable = false; }
    var chain = (0, pg_core_1.uuid)("audit_trail_log_id").references(function () { return schema_1.audit_trail.log_id; });
    if (!nullable) {
        chain = chain.notNull();
    }
    var props = {
        audit_trail_logs: chain,
    };
    return __assign(__assign({}, schema), props);
}
exports.withAuditTrailLog = withAuditTrailLog;
function withAuditTrailLogs(schema, nullable) {
    if (nullable === void 0) { nullable = false; }
    var chain = (0, pg_core_1.jsonb)("audit_trail_logs").$type().default([]);
    if (!nullable) {
        chain = chain.notNull();
    }
    var props = {
        audit_trail_logs: chain,
    };
    return __assign(__assign({}, schema), props);
}
exports.withAuditTrailLogs = withAuditTrailLogs;
function withUserTrailLog(schema, nullable) {
    if (nullable === void 0) { nullable = false; }
    var chain = (0, pg_core_1.uuid)("user_activity_trail_log").references(function () { return schema_1.public_user_activity_trail.log_id; });
    if (!nullable) {
        chain = chain.notNull();
    }
    var props = {
        user_activity_trail_log: chain,
    };
    return __assign(__assign({}, schema), props);
}
exports.withUserTrailLog = withUserTrailLog;
function withUserTrailLogs(schema, nullable) {
    if (nullable === void 0) { nullable = false; }
    var chain = (0, pg_core_1.jsonb)("user_activity_trail_logs").$type().default([]);
    if (!nullable) {
        chain = chain.notNull();
    }
    var props = {
        user_activity_trail_logs: chain,
    };
    return __assign(__assign({}, schema), props);
}
exports.withUserTrailLogs = withUserTrailLogs;
function withTrackingActivity(schema, nullable) {
    if (nullable === void 0) { nullable = false; }
    var chain = (0, pg_core_1.uuid)("tracking_activity_id").references(function () { return schema_1.tracking_activity.activity_id; });
    if (!nullable) {
        chain = chain.notNull();
    }
    var props = {
        tracking_activity_id: chain,
    };
    return __assign(__assign({}, schema), props);
}
exports.withTrackingActivity = withTrackingActivity;
var templateObject_1;
