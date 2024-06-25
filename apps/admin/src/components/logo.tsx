import { useMemo } from "react";

export function Logo({
  variant = "regular",
}: {
  variant?: "small" | "regular";
}) {
  const sizeClass = useMemo(() => {
    switch (variant) {
      case "small":
        return "w-8 h-8";
      case "regular":
        return "w-12 h-12";
    }
  }, [variant]);
  return (
    <div className="flex gap-2 items-center">
      <img className={sizeClass} alt="Sourtech Logo" src="/sourtech_logo.png" />
      <span className="min-w-fit whitespace-nowrap font-medium">
        Sour System
      </span>
    </div>
  );
}
