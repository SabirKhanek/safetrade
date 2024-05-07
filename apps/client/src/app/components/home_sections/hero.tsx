import { Suspense, useRef } from "react";
import GradientBg from "./components/gradient_bg";
import AnimatedWave from "../animated_wave";
import OffersSearch from "../offers_search";
import Link from "next/link";
import { Chip } from "../chip";
import Image from "next/image";
import "./hero_styles.css";
export default function Hero() {
  return (
    <>
      <div className="hero-container overflow-hidden relative text-white">
        <Suspense fallback={<>loading...</>}>
          <GradientBg></GradientBg>
        </Suspense>
        <div className="pt-48 pb-20 container relative font-montesserat z-2">
          <p className="hero-text leading-none text-5xl font-bold">
            <span>Get what you need,</span>
            <br />
            <span className="italic font-normal">Safely and Securely,</span>
            <br />
            <span>Everytime!</span>
          </p>
          <div className="my-9">
            <OffersSearch className="max-w-[450px]"></OffersSearch>
          </div>
          <ul className="flex items-center my-4 flex-wrap gap-3 hero-chips-list before:content-['Popular:'] before:font-bold before:mr-2">
            {popularChips.map((c, i) => (
              <Link key={i} href={c.target}>
                <Chip white>{c.name}</Chip>
              </Link>
            ))}
          </ul>
          <div>
            <h3 className="text font-semibold">
              Already in touch with buyer or seller?
            </h3>
            <Link href="#" className="italic text-sm font-light underline ">
              Use safetrade&apos;s escrow service to secure your transaction
            </Link>
          </div>
        </div>
        <div className="overflow-hidden animated-wave-container">
          <AnimatedWave className=""></AnimatedWave>
        </div>
        <div className="absolute  hidden md:block md:-right-[30vw] top-1/2 -translate-y-[55%] right-[-5vw] 2xl:right-[5vw] hero-illustration">
          <div className="hero-illustration-inner">
            <img
              src="/assets/images/hero-illustration.svg"
              className=" responsive-hero-illustration w-[500px] h-auto"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
}

const popularChips = [
  { name: "Domains", target: "/search?query=domains" },
  { name: "NFTs", target: "/search?query=nfts" },
  { name: "Software Licenses", target: "/search?query=softwares" },
  { name: "Freelance Services", target: "/search?query=freelance" },
];
