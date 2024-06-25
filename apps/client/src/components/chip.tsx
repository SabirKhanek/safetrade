import { HTMLProps } from "react";
export interface ChipProps extends HTMLProps<HTMLSpanElement> {
  white?: boolean;
}
export function Chip({ name, white, ...props }: ChipProps) {
  const colorClass = white ? "chip-white" : "chip-black";
  return (
    <span
      {...props}
      className={`inline-block px-3 text-xs rounded-3xl bg-transparent chip border chip-white ${colorClass}`}
    >
      {props.children}
    </span>
  );
}
