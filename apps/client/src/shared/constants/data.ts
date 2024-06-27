import { NavItemWithOptionalChildren } from "@/types";

export const navItems: NavItemWithOptionalChildren[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: "wallet",
    label: "user",
    items: [
      {
        title: "Deposits",
        href: "/dashboard/wallet/deposits",
        label: "deposits",
      },
      { title: "Transactions", href: "/transactions", label: "transactions" },
    ],
  },
  {
    title: "Offers",
    icon: "offers",
    href: "/dashboard/offers",
    label: "offers",
  },
  {
    title: "Messages",
    icon: "messages",
    href: "/dashboard/messages",
  },
  // {
  //   title: "Disputes",
  //   href: "/dashboard/tickets",
  //   icon: "ticketx",
  //   label: "tickets",
  // },
];
