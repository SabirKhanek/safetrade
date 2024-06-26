import { RouteOnLogout } from "@/components/providers/authstate-provider";
import "./dashboard.css";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cookies } from "next/headers";
import { Cookies } from "common";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardRoutesLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const cookie = cookies();
  if (!cookie.get(Cookies.UserAuthCookie)) {
    redirect("/login");
  }
  return (
    <DashboardLayout>
      {children}
      <RouteOnLogout />
    </DashboardLayout>
  );
}
