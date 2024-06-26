import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";

export function RouteLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">{children}</div>
    </ScrollArea>
  );
}

export function RouteLayoutHeading({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between space-y-2">
      {children}
    </div>
  );
}

export function RouteLayoutName({ children }: { children?: ReactNode }) {
  return <h2 className="text-3xl font-bold tracking-tight">{children}</h2>;
}
