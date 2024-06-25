import { HTMLProps } from "react";
import { FadeInSection } from "../fadein_section";
import not_limited_illustration from "./assets/not-limited-illustration.png";
import Image from "next/image";
import { Button } from "../button";
import { AnimatedList } from "../animatedList";
export interface NotLimitedProps extends HTMLProps<HTMLElement> {
  children?: React.ReactNode;
}

export function NotLimited({ children, ...props }: NotLimitedProps) {
  return (
    <section
      {...props}
      className={
        "py-24 container container-small grid gap-10 md:grid-cols-[6fr_4fr]"
      }
    >
      <div className="">
        <h2 className="heading">
          <span className="gradient-text">SafeTrade</span> isn't limited to
          digital assets. We facilitate secure transactions for tangible goods
          too.
        </h2>
        <p className="body-text my-3">
          Whether you're buying or selling digital assets or services, Safetrade
          ensures a smooth and secure process at every step. With our escrow
          protection, we prioritize your peace of mind, eliminating any concerns
          about counterparty risks that may arise during transactions.
        </p>

        <p className="my-4 font-bold">
          Ready to buy or sell? Join safetrade today!
        </p>
        <Button className="mt-2">Join Now</Button>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-lg md:aspect-[540/564]  overflow-hidden rounded-3xl">
          <Image
            loading="lazy"
            className="object-cover object-center !w-full !h-full"
            alt="Hero Illustration"
            src={not_limited_illustration.src}
            width={not_limited_illustration.width}
            height={not_limited_illustration.height}
          ></Image>
        </div>
      </div>
    </section>
  );
}
