"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormat = exports.areSetsEqual = exports.hasPermission = exports.GetPublicUrl = exports.isValidUUID = exports.generateSlug = void 0;
function generateSlug(input) {
    return input
        .toLowerCase() // Convert to lowercase
        .trim() // Trim leading and trailing whitespace
        .replace(/[^\w\s-]/g, "") // Remove all non-word characters (alphanumeric and underscore)
        .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
exports.generateSlug = generateSlug;
function isValidUUID(uuid) {
    var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
exports.isValidUUID = isValidUUID;
function GetPublicUrl(uri) {
    if (!uri)
        return "";
    var asset_prefix = process.env.PUBLIC_ASSET_PREFIX;
    return "".concat(asset_prefix, "/").concat(uri);
}
exports.GetPublicUrl = GetPublicUrl;
var hasPermission = function (user, permission) {
    if (!user)
        return false;
    return user.permissions.includes(permission);
};
exports.hasPermission = hasPermission;
function areSetsEqual(setA, setB) {
    try {
        if (setA.size !== setB.size) {
            return false;
        }
        var isEqual_1 = true;
        setA.forEach(function (elem) {
            if (!setB.has(elem)) {
                isEqual_1 = false;
            }
        });
        return isEqual_1;
    }
    catch (err) {
        return false;
    }
}
exports.areSetsEqual = areSetsEqual;
var DateFormat;
(function (DateFormat) {
    DateFormat["DD_MM_YYYY_HH_MM_AMPM"] = "dd-MM-yyyy hh:mm aa";
    DateFormat["DD_MON_YYYY_HH_MM_AMPM"] = "dd MMM, yyyy hh:mm aa";
    DateFormat["D_MONTH_YY_H_M_S_AMPM"] = "d MMMM, yy H:m:s aa";
    DateFormat["YYYY_MM_DD_HH_MM_SS"] = "yyyy-MM-dd HH:mm:ss";
    DateFormat["MM_DD_YYYY_HH_MM_SS"] = "MM/dd/yyyy HH:mm:ss";
    DateFormat["FULL_DATE_TIME"] = "MMMM dd, yyyy HH:mm:ss";
    DateFormat["SHORT_DATE"] = "MMM dd, yy";
    DateFormat["TIME_24_HR"] = "HH:mm:ss";
    DateFormat["TIME_12_HR"] = "hh:mm:ss aa";
})(DateFormat || (exports.DateFormat = DateFormat = {}));
