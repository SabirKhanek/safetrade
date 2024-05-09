import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  buttonType?: "primary";
  children: React.ReactNode;
}

export function Button({
  buttonType = "primary",
  children,
  ...props
}: ButtonProps) {
  const classes = `btn btn-${buttonType}`;
  return (
    <button
      {...(props as any)}
      className={`${props.className || ""} ${classes}`}
    >
      {children}
    </button>
  );
}
