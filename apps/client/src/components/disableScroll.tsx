"use client";

import { useEffect } from "react";

function disableScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

export function DisableScroll({ disabled }: { disabled: boolean }) {
  useEffect(() => {
    if (disabled) {
      disableScroll();
    } else {
      enableScroll();
    }

    const handleWindowWheel = (event: WheelEvent) => {
      if (disabled) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, [disabled]);
  return null;
}
