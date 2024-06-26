import { NavItemWithOptionalChildren } from "@/types";

export const navItems: NavItemWithOptionalChildren[] = [
  {
    title: "Dashboard",
    href: "/",
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
        href: "#",
        label: "manage-users",
      },
    ],
  },
  {
    title: "Access Control",
    icon: "shield",
    href: "/",
    label: "access-ctrl",
  },
  {
    title: "Audit Logs",
    href: "/",
    icon: "audit",
    label: "employee",
  },
];
