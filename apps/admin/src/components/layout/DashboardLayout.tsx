import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return <>
    <Header />
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden pt-16">{children}</main>
    </div>
  </>;
}
