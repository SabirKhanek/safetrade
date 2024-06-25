"use client";
import { HTMLProps } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa6";
export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  buttonType?: "primary";
  children: React.ReactNode;
  isLoading?: boolean;
  disableOnLoading?: boolean;
}

export function Button({
  buttonType = "primary",
  children,
  disableOnLoading = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  const classes = `btn btn-${buttonType}`;
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      {...(props as any)}
      className={`${props.className || ""} ${classes}`}
      disabled={(disableOnLoading && isLoading) || props.disabled}
    >
      <span className={`${isLoading ? "btn-loading" : ""}`}>
        {isLoading && <FaSpinner className="animate-spin"></FaSpinner>}
        {children}
      </span>
    </motion.button>
  );
}
