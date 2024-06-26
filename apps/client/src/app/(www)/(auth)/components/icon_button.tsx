"use client";
import { HTMLProps } from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export interface IconButtonProps extends HTMLProps<HTMLElement> {
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      {...(props as any)}
      className={`${props.className || ""} flex items-center w-full border font-medium rounded-lg transition-colors duration-300  justify-center padded-button border-text-500 text-text-500 hover:text-background hover:bg-foreground bg-transparent `}
    >
      <div className="min-w-16 flex whitespace-nowrap justify-start items-center gap-2">
        {icon}
        {children}
      </div>
    </motion.button>
  );
}

// export const SpotlightButton = ({
//   icon,
//   children,
//   ...props
// }: IconButtonProps) => {
//   const btnRef = useRef<HTMLButtonElement>(null);
//   const spanRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const handleMouseEnter = (e: MouseEvent) => {
//       if (!spanRef.current) return;

//       //   spanRef.current.animate(
//       //     // { scale: 50 },
//       //     { duration: 100, fill: "forwards" }
//       //   );
//     };

//     const handleMouseMove = (e: any) => {
//       if (!spanRef.current) return;

//       const { width, height } = e.target.getBoundingClientRect();
//       const offset = e.offsetX;
//       const offsetY = e.offsetY;
//       const left = `${(offset / width) * 100}%`;
//       const top = `${(offsetY / height) * 100}%`;
//       spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
//       spanRef.current.animate({ top }, { duration: 250, fill: "forwards" });
//     };

//     const handleMouseLeave = (e: MouseEvent) => {
//       if (!spanRef.current) return;

//       spanRef.current.animate(
//         { left: "50%", scale: 1 },
//         { duration: 100, fill: "forwards" }
//       );
//     };
//     if (!btnRef.current) return;
//     btnRef.current.addEventListener("mousemove", handleMouseMove);
//     btnRef.current.addEventListener("mouseleave", handleMouseLeave);
//     btnRef.current.addEventListener("mouseenter", handleMouseEnter);

//     return () => {
//       if (!btnRef.current) return;
//       btnRef.current.removeEventListener("mousemove", handleMouseMove);
//       btnRef.current.removeEventListener("mouseleave", handleMouseLeave);
//       btnRef.current.removeEventListener("mouseenter", handleMouseEnter);
//     };
//   }, []);

//   return (
//     <motion.button
//       whileTap={{ scale: 0.985 }}
//       ref={btnRef}
//       className="relative w-full max-w-xs overflow-hidden rounded-lg padded-button border border-black bg-white text-lg font-medium text-white"
//     >
//       <span className="pointer-events-none relative inline-flex items-center gap-3 justify-start max-w-[80%] z-10 mix-blend-difference">
//         {icon}
//         {children}
//       </span>
//       <span
//         ref={spanRef}
//         style={{ transformOrigin: "0 0", willChange: "transform" }}
//         className={`pointer-events-none before:absolute before:w-[170%] before:aspect-square before:bg-black before:rounded-full before:-translate-y-1/2 before:-translate-x-1/2 before:top-0 before:left-0 before:content-[""] absolute inset-0 left-full w-6 h-6 top-full -translate-y-1/2  -translate-x-1/2 rounded-full bg-black`}
//       />
//     </motion.button>
//   );
// };
