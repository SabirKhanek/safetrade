"use client";
import { motion, useInView } from "framer-motion";
import { HTMLProps, useEffect, useRef } from "react";

export interface AnimatedListProps extends HTMLProps<HTMLUListElement> {
  items: string[];
  itemClass?: string;
  listIconSize?: number;
  textClass?: string;
}

export function AnimatedList({
  items,
  itemClass,
  listIconSize,
  textClass,
  ...props
}: AnimatedListProps) {
  return (
    <ul {...props}>
      {items.map((text, index) => (
        <AnimatedListItem
          index={index}
          key={index}
          itemClass={itemClass}
          listIconSize={listIconSize}
          text={text}
          textClass={textClass}
        />
      ))}
    </ul>
  );
}

function AnimatedListItem({
  text,
  index,
  itemClass,
  listIconSize,
  textClass,
}: {
  text: string;
  index: number;
  textClass?: string;
  itemClass?: string;
  listIconSize?: number;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  return (
    <motion.li
      initial={{ display: "hidden", opacity: 0, translateY: 15 }}
      ref={liRef}
      whileInView={{
        display: "flex",
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.2, delay: 0.2 * index },
      }}
      onAnimationStart={() => {
        const ele = Array.from(
          (liRef.current?.querySelectorAll(".checkmark") as unknown as
            | HTMLCollectionOf<HTMLElement>
            | undefined) || []
        ).at(0);
        if (!ele) return;

        ele.style.display = "none";

        setTimeout(() => {
          ele.style.display = "block";
        }, 100);
      }}
      className={`flex items-center rounde gap-1 my-1 ${itemClass}`}
    >
      <CheckMark width={listIconSize || 17} height={listIconSize || 17} />
      <span className={` text-sm font-light ${textClass}`}>{text}</span>
    </motion.li>
  );
}

export function CheckMark({ ...props }: HTMLProps<HTMLOrSVGElement>) {
  return (
    <svg
      fill="none"
      className="checkmark"
      viewBox="1.308 1.721 31.308 30.256"
      xmlns="http://www.w3.org/2000/svg"
      {...(props as any)}
    >
      <defs />
      <style>
        {`@keyframes draw-checkmark-outline {
      0% {
        stroke-dashoffset: -80.84;
      }

      100% {
        stroke-dashoffset: 0;
      }
    }

    @keyframes draw-checkmark-tick {
      0% {
        stroke-dashoffset: 27.352;
      }

      100% {
        stroke-dashoffset: 0;
      }
    }

    .checkmark-outline {
      stroke-dashoffset: 80.84;
      stroke-dasharray: 80.84;
    }

    .checkmark-tick {
      stroke-dashoffset: 27.352;
      stroke-dasharray: 27.352;
    }

    .checkmark-outline {
      animation: draw-checkmark-outline 1s linear 1 forwards;
    }

    .checkmark-tick {
      animation: draw-checkmark-tick 1s linear 0.5s forwards;
      animation-delay: 0.5s;
    }
    .animate .checkmark-outline  {
      animation: draw-checkmark-outline 1s linear 1 forwards;
    }

    .animate .checkmark-tick {
      animation: draw-checkmark-tick 1s linear 0.5s forwards;
      animation-delay: 0.5s;
    }`}
      </style>
      <path
        className="checkmark-outline"
        d="M29.75 14.167v13.458a2.125 2.125 0 0 1-2.125 2.125H6.375a2.125 2.125 0 0 1-2.125-2.125V6.375A2.125 2.125 0 0 1 6.375 4.25H21.25"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="checkmark-tick"
        d="m11.333 14.167 7.084 5.666L29.042 4.958"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
