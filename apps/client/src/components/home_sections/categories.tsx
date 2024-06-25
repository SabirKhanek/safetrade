"use client";
import { HTMLProps, useRef } from "react";
import "./categories_styles.css";
import { FadeInSection } from "../fadein_section";
import Link from "next/link";

export interface CategoriesProps extends HTMLProps<HTMLElement> {
  children?: React.ReactNode;
}

export function Categories({ children, ...props }: CategoriesProps) {
  return (
    <section className="bg-contrast py-24">
      <div className="container">
        {/* <div className="flex justify-between items-center mb-5"> */}
        <h2 className="heading text-center">
          Popular <span className="gradient-text">Categories</span>
        </h2>
        {/* <Link className="underline text-sm" href="/categories">
            Show All
          </Link>
        </div> */}
        <p className="mx-auto max-w-3xl text-center mb-5 mt-2">
          Safetrade's seller ecosystem supports selling of any product or
          service there is. Safetrade can be a part of any transaction. You can
          discover popular categories in safetrade.
        </p>
        <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-md:[&>*:nth-child(2)]:hidden max-lg:[&>*:nth-child(1)]:hidden items-center gap-5 justify-center">
          {categories.map((ct, index) => (
            <Link
              href={ct.href}
              key={index}
              className="aspect-[231/323] max-w-[231px] rounded-lg relative shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <Image
                src={ct.illustration.src}
                loading="lazy"
                width={ct.illustration.width}
                height={ct.illustration.height}
                className="!h-full object-cover object-center"
                alt=""
              />
              <h2 className="text-white absolute top-7 left-1/2 text-center leading-none font-semibold text-xl -translate-x-1/2">
                {ct.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className=" mt-5">Discover More</Button>
        </div>
      </div>
    </section>
  );
}
import subscription_illustration from "./assets/categories/subscription.png";
import nfts_illustration from "./assets/categories/nfts.png";
import freelance_illustration from "./assets/categories/freelance.png";
import games_illustration from "./assets/categories/games.png";
import domains_illustration from "./assets/categories/domains.png";
import Image from "next/image";
import { Button } from "../button";

const categories = [
  {
    name: "Subscriptions",
    illustration: subscription_illustration,
    href: "/search?categories=subscription",
  },
  {
    name: "NFTs",
    illustration: nfts_illustration,
    href: "/search?categories=nfts",
  },
  {
    name: "Freelance Services",
    illustration: freelance_illustration,
    href: "/search?categories=freelance",
  },
  {
    name: "Games",
    illustration: games_illustration,
    href: "/search?categories=games",
  },
  {
    name: "Domain Names",
    illustration: domains_illustration,
    href: "/search?categories=domains",
  },
];
