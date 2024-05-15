"use client";
import { HTMLProps } from "react";
import buyer_search from "./assets/steps/looks-for-products-animated.svg";
import view_profile from "./assets/steps/views-profile-animated.svg";
import payment_locked from "./assets/steps/safetrade-payment-lock-animated.svg";
import seller_delivers from "./assets/steps/shipment_box_animated.svg";
import buyer_approves from "./assets/steps/buyer-approved-animated.svg";
import payment_released from "./assets/steps/safetrade-payment-unlock-animated.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../components/button";
import Link from "next/link";
import { FadeInSection } from "../components/fadein_section";
export function HowWeWork() {
  return (
    <section className="py-28 bg-contrast">
      <div className="container">
        <h2 className="heading-small mx-auto max-w-2xl text-center">
          How <span className="gradient-text">safetrade</span> enables hassle
          free secure transactions?
        </h2>
        <p className="text-center mx-auto my-5 mb-10 max-w-3xl">
          Safetrade.cloud is the world's most secure payment method from a
          counterparty risk perspective - safeguarding both buyer and seller,
          all funds transacted using Safetrade are kept in trust.
        </p>
        <ul className="grid grid-cols-1 ml:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 gap-y-9 workflow-steps-list">
          {steps.map((v, i) => (
            <WorkflowStep
              illustration={v.illustration}
              index={i}
              key={i}
              step_text={v.text}
            ></WorkflowStep>
          ))}
        </ul>
        <div className="flex justify-center items-center mt-10 mb-3">
          <Button className="mx-auto">Get Started</Button>
        </div>
        <Link
          className="font-semibold w-fit mx-auto underline-effect text-primary uppercase text-sm #D00091 text-center block"
          href="/learn"
        >
          Learn more about safetrade
        </Link>
      </div>
    </section>
  );
}

const steps = [
  {
    illustration: view_profile,
    text: "Buyer looks for a product or service on safetrade ",
  },
  {
    illustration: buyer_search,
    text: "Buyer views our KYC  verified seller profile and offered product",
  },
  { illustration: payment_locked, text: "Buyer submits payment to Safetrade" },
  {
    illustration: seller_delivers,
    text: "Seller delivers goods or service to buyer",
  },
  { illustration: buyer_approves, text: "Buyer approves goods or services" },
  {
    illustration: payment_released,
    text: "Safetrade.cloud releases payment to seller",
  },
];

function WorkflowStep({
  illustration,
  index,
  step_text,
  ...props
}: {
  illustration: any;
  step_text: string;
  index: number;
} & HTMLProps<HTMLElement>) {
  return (
    <li
      {...(props as any)}
      className={`${props.className || ""} flex flex-col justify-center items-center gap-5`}
    >
      <div className="step-illustration h-36 flex justify-center items-center">
        <Image
          src={illustration.src}
          className="!h-full w-auto"
          width={illustration.width}
          height={illustration.height}
          loading="lazy"
          alt=""
        />
      </div>
      <p className="text-sm font-light text-center">
        {index + 1}. {step_text}
      </p>
    </li>
  );
}
