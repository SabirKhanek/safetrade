"use client";
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
      <img
        className={sizeClass}
        alt="Safetrade Logo"
        src="/assets/images/safetrade-logo.svg"
      />
      <span
        style={{ fontFamily: "Montserrat" }}
        className="min-w-fit text-xl whitespace-nowrap font-medium"
      >
        Safetrade Systems
      </span>
    </div>
  );
}
