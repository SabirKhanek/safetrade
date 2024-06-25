"use client";
import { HTMLProps } from "react";
import { motion } from "framer-motion";

export interface FadeInSectionProps extends HTMLProps<HTMLElement> {
    children: React.ReactNode;
}

export function FadeInSection({ children, ...props }: FadeInSectionProps) {
  return (
    <motion.section
      {...(props as any)}
      initial={{ opacity: 0, translateY: 15 }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 1 },
      }}
      className={`${props.className || ""}`}
    >{children}</motion.section>
  );
}
