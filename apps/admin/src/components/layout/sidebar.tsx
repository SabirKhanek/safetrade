"use client";
import { useState } from "react";
import {
  DashboardNav,
  DashboardNavItem,
} from "@/components/layout/dashboard-nav";
import { navItems } from "@/shared/constants/data";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Logout } from "../logout-button";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Routes } from "@/app.routes";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const path = useLocation().pathname;
  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <DashboardNav items={navItems} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <NewDropdown />

          <div className="py-2 px-3  border-t-2 border-dashed flex flex-col gap-2">
            <TooltipProvider>
              <DashboardNavItem
                isMobileNav={false}
                isMinimized={isMinimized}
                path={path}
                item={{
                  title: "Settings",
                  icon: "settings",
                  href: "/settings",
                }}
              ></DashboardNavItem>
              <DashboardNavItem
                isMobileNav={false}
                isMinimized={isMinimized}
                path={path}
                item={{
                  title: "Logout",
                  icon: "login",
                  href: "#",
                }}
                onClick={Logout}
              ></DashboardNavItem>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NewDropdown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full px-3">
          <Button className="w-full">
            <Icons.new size={16}></Icons.new>New
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="">New</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate(Routes.UserControl);
            }}
          >
            User
            <DropdownMenuShortcut>
              <Icons.user
                className="text-popover-foreground"
                size={10}
              ></Icons.user>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
