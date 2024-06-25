"use client";

import { Link, useLocation } from "react-router-dom";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItemWithOptionalChildren } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DashboardNavProps {
  items: NavItemWithOptionalChildren[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

interface DashboardNavItemProps {
  item: NavItemWithOptionalChildren;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav: boolean;
  isMinimized: boolean;
  path: string;
  onClick?: () => void | Promise<void>;
}

export function DashboardNavItem({
  item,
  setOpen,
  isMobileNav,
  isMinimized,
  path,
  onClick,
}: DashboardNavItemProps) {
  const Icon = Icons[item.icon || "arrowRight"];
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div>
      <Tooltip key={item.href}>
        <TooltipTrigger asChild>
          <Link
            to={(item.disabled ? "/" : item.href) || "#"}
            className={cn(
              "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href ? "bg-accent text-primary" : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
            onClick={() => {
              if (setOpen) setOpen(false);
              if (onClick) onClick();
              if (item.items) setSubmenuOpen(!isSubmenuOpen);
            }}
          >
            <Icon className={`ml-3 size-5`} />
            {isMobileNav || (!isMinimized && !isMobileNav) ? (
              <span className="mr-2 truncate">{item.title}</span>
            ) : (
              ""
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          side="right"
          sideOffset={8}
          className={!isMinimized ? "hidden" : "inline-block"}
        >
          {item.title}
        </TooltipContent>
      </Tooltip>
      {item.items && isSubmenuOpen && !isMinimized && (
        <div className="ml-4 my-2">
          {item.items.map((childItem, index) => (
            <DashboardNavItem
              key={index}
              item={childItem}
              setOpen={setOpen}
              isMobileNav={isMobileNav}
              isMinimized={isMinimized}
              path={path}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = useLocation().pathname;
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  console.log("isActive", isMobileNav, isMinimized);

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map(
          (item, index) =>
            item.href && (
              <DashboardNavItem
                key={index}
                item={item}
                setOpen={setOpen}
                isMobileNav={isMobileNav}
                isMinimized={isMinimized}
                path={path}
              />
            )
        )}
      </TooltipProvider>
    </nav>
  );
}
