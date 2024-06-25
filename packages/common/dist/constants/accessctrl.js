"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Groups = void 0;
var root_user_group = process.env.ROOT_USER_GROUP || "root_user_group";
exports.Groups = {
    RootGroup: root_user_group,
    SupportStaff: "support_staff",
};
exports.Permissions = {
    ReadUserPermissions: "read_user_permissions",
    UpdateUserPermissions: "update_user_permissions",
    AddUsers: "add_user",
};
