"use client";
import { RouteOnLogout } from "@/components/providers/authstate-provider";
import "./dashboard.css";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardRoutesLayout() {
  return (
    <DashboardLayout>
      <RouteOnLogout />
    </DashboardLayout>
  );
}
