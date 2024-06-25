import { Routes } from "@/app.routes";
import { NavItemWithOptionalChildren } from "@/types";

export const navItems: NavItemWithOptionalChildren[] = [
  {
    title: "Dashboard",
    href: Routes.Home,
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/user-control",
    icon: "user",
    label: "user",
    items: [
      {
        title: "Manage Users",
        href: Routes.UserControl,
        label: "manage-users",
      },
    ],
  },
  {
    title: "Access Control",
    icon: "shield",
    href: Routes.AccessControl,
    label: "access-ctrl",
  },
  {
    title: "Audit Logs",
    href: Routes.AuditLogs,
    icon: "audit",
    label: "employee",
  },
];
