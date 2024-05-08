"use client";
import Link from "next/link";
import "./header_styles.css";
import { SafetradeLogoFull } from "../logoFull";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navlinks } from "./data/navlinks";
import { Turn as Hamburger } from "hamburger-react";
import { NavMenuFull } from "./nav-menu";

export default function Header() {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("");
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  useEffect(() => {
    setActiveRoute(window.location.href);
  }, [pathname]);
  return (
    <>
      <nav className="main-header header-attached">
        <div className="main-header-left isolate relative">
          <div className="scale-[0.6] z-[1] nav-ham-button translate-x-[-10px] border-[1.5px] border-[--head-text-color] rounded-lg">
            <Hamburger
              color="var(--head-text-color)"
              size={26}
              easing="cubic-bezier(.71,.22,.29,.94)"
              aria-controls="main-header-full"
              toggled={isNavMenuOpened}
              onToggle={() => setIsNavMenuOpened(!isNavMenuOpened)}
            ></Hamburger>
          </div>
          <Link className="relative z-0" href="/">
            <SafetradeLogoFull
              className="header-logo -translate-x-[10px] ml:translate-x-0"
              height={44}
            ></SafetradeLogoFull>
          </Link>
        </div>
        <div className="flex gap-5 items-center h-full header-links">
          {navlinks.map((link, index) => {
            let isActive = activeRoute === pathname;
            const activeClass = isActive ? "header-link-active" : "";
            return (
              <Link
                key={index}
                href={link.route}
                className={`header-link ${activeClass}`}
              >
                {link.name}
              </Link>
            );
          })}
          <button className="header-cta hidden xsm:block rounded-lg">
            Get Started
          </button>
        </div>
      </nav>
      <NavMenuFull
        isOpened={isNavMenuOpened}
        setIsOpened={setIsNavMenuOpened}
      ></NavMenuFull>
    </>
  );
}
