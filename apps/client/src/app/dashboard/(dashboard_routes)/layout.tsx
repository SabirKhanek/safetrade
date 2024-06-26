import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export default function DashboardRoutesLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">{children}</div>
    </ScrollArea>
  );
}
