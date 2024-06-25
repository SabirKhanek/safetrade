import React from "react";

export function HamButton({
  isOpended,
  setIsOpened,
  ...props
}: {
  isOpended: boolean;
  setIsOpened: (p1: boolean) => void;
} & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      aria-expanded={isOpended}
      data-state={isOpended ? "opened" : "closed"}
      className="nav-ham-button"
      onClick={() => setIsOpened(!isOpended)}
      {...(props as any)}
    >
      <svg
        stroke="var(--button-color)"
        fill="none"
        className="hamburger"
        viewBox="-10 -10 120 120"
      >
        <path
          className="line"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
        ></path>
      </svg>
    </button>
  );
}
