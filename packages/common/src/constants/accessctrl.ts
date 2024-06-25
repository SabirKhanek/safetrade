const root_user_group = process.env.ROOT_USER_GROUP || "root_user_group";

export const Groups = {
  RootGroup: root_user_group,
  SupportStaff: "support_staff",
} as const;

export const Permissions = {
  ReadUserPermissions: "read_user_permissions",
  UpdateUserPermissions: "update_user_permissions",
  ReadGroupPermissions: "read_group_permissions",
  UpdateGroupPermissions: "update_group_permissions",
  AddUsers: "add_user",
  RemoveUser: "remove_user",
  ListUsers: "list_users",
  ReadAuditTrails: "read_audit_trails",
} as const;

export type GroupsType = (typeof Groups)[keyof typeof Groups];
export type PermissionsType = (typeof Permissions)[keyof typeof Permissions];
