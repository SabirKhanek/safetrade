const root_user_group = process.env.ROOT_USER_GROUP || "root_user_group";

export const Groups = {
  RootGroup: root_user_group,
  SupportStaff: "support_staff",
} as const;

export const Permissions = {
  ReadUserPermissions: "read_user_permissions",
  UpdateUserPermissions: "update_user_permissions",
  AddUsers: "add_user",
} as const;

export type GroupsType = (typeof Groups)[keyof typeof Groups];
export type PermissionsType = (typeof Permissions)[keyof typeof Permissions];
