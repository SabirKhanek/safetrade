import { useEffect, useRef } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { DisableScroll } from "../disableScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navlinks } from "./data/navlinks";
import { NavlinkActive } from "../navlink";
import Link from "next/link";

export function NavMenuFull({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: (p1: boolean) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline();
      if (isOpened) {
        tl.set(navRef.current, {
          height: "100%",
        });
        tl.to(navRef.current, {
          delay: 0.5,
          duration: 0.2,
          opacity: 1,
        });
        tl.to(".nav-close-button", { duration: 0.1, opacity: 1 });
        tl.to(".mobile_nav_text", {
          opacity: 1,
          duration: 0.2,
          y: "0",
          rotateZ: 0,
          stagger: 0.05,
        });
      } else {
        tl.to(".mobile_nav_text", {
          opacity: 0,
          y: "-100%",
          rotateZ: -15,
          stagger: 0.05,
          duration: 0.2,
        });
        tl.to(".nav-close-button", { duration: 0.1, opacity: 0 });
        tl.to(navRef.current, {
          duration: 0.2,
          opacity: "0",
        });
        tl.set(navRef.current, {
          height: "0%",
        });
      }
    },
    { dependencies: [isOpened], scope: navRef }
  );
  return (
    <div
      ref={navRef}
      className="fixed text-white left-0 w-screen z-10 blur-bg h-0 overflow-hidden nav-full"
    >
      <DisableScroll disabled={isOpened}></DisableScroll>

      <div className="absolute nav-close-button top-2 right-2">
        <Hamburger
          color="white"
          toggled={isOpened}
          toggle={() => setIsOpened(!isOpened)}
          rounded
        ></Hamburger>
      </div>
      <div className="p-5 flex flex-col h-full justify-end py-7">
        <ul className="text-4xl xsm:text-5xl flex flex-col gap-2 text-white font-medium">
          {navlinks.map((link, i: number) => {
            return (
              <li key={i} className="inline-block overflow-hidden py-1">
                <NavlinkActive
                  href={link.route}
                  onClick={() => setIsOpened(false)}
                  className={(isActive) =>
                    `${
                      isActive ? "text-white" : "text-white/65"
                    } hover:text-white duration-300 font-montesserat origin-bottom-left mobile_nav_text inline-block transition-all relative cursor-pointer`
                  }
                >
                  {link.name}
                </NavlinkActive>
              </li>
            );
          })}
        </ul>
        <ul className="mt-10 [&>li]:my-1 font-normal [&>li]:transition-colors [&>li]:duration-300 hover:[&>li]:underline hover:[&>li]:text-white text-white/60 ">
          <li className="mobile_nav_text">
            <Link href="#">Get Started</Link>
          </li>
          <li className="mobile_nav_text">
            <Link href="#">info@safetrade.cloud</Link>
          </li>
        </ul>
        <ul className="mt-7 font-normal [&>li]:transition-colors [&>li]:duration-300 hover:[&>li]:underline hover:[&>li]:text-white text-white/60 ">
          <li className="mobile_nav_text">
            <Link href="#">Privacy Policy</Link>
          </li>
          <li className="mobile_nav_text">
            <Link href="#">FAQs</Link>
          </li>
          <li className="mobile_nav_text">
            <Link href="#">Guideline</Link>
          </li>
          <li className="mobile_nav_text">
            <Link href="#">Terms and Conditions</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
