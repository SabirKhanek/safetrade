"use client";
import { HTMLProps } from "react";
import { AnimatedList } from "../animatedList";
import { Button } from "../button";
import intro_illustration from "./assets/safetrade-intro-illustration.png";
import Image from "next/image";
import { motion } from "framer-motion";
export function IntroSection({ ...props }: HTMLProps<HTMLElement>) {
  return (
    <motion.section
      {...(props as any)}
      initial={{ display: "hidden", opacity: 0, translateY: 15 }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 1 },
      }}
      className={`${props.className || ""} intro-section pt-24 p-16 gap-10  container !max-w-5xl  grid grid-cols-1 md:grid-cols-[40fr_60fr] `}
    >
      <div className="flex justify-center items-center">
        <div className="max-w-lg md:aspect-[540/564] order-2 overflow-hidden rounded-3xl">
          <Image
            loading="lazy"
            className="object-cover object-center !w-full !h-full"
            alt="Hero Illustration"
            src={intro_illustration.src}
            width={intro_illustration.width}
            height={intro_illustration.height}
          ></Image>
        </div>
      </div>
      <div className="order-1 md:order-last">
        <h2 className="heading">
          Safetrade is your trusted platform for safe and secure online
          transaction
        </h2>
        <p className="body-text my-3">
          Whether you're buying or selling digital assets or services, Safetrade
          ensures a smooth and secure process at every step. With our escrow
          protection, we prioritize your peace of mind, eliminating any concerns
          about counterparty risks that may arise during transactions.
        </p>
        <AnimatedList
          items={[
            "Escrow protected transactions",
            "Protection against fraud and scams",
            "Transparent transaction process",
            "Global access to buyers and sellers",
          ]}
          textClass="text-black"
        ></AnimatedList>

        <Button className="mt-2">Join Now</Button>
      </div>
    </motion.section>
  );
}
