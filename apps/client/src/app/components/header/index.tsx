"use client";
import Link from "next/link";
import "./header_styles.css";
import { SafetradeLogoFull } from "../logoFull";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header() {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("");
  useEffect(() => {
    setActiveRoute(window.location.href);
  }, [pathname]);
  return (
    <nav className="main-header header-attached">
      <Link className="relative" href="/">
        <SafetradeLogoFull
          className="header-logo"
          height={44}
        ></SafetradeLogoFull>
      </Link>
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
        <button className="header-cta rounded-lg">Join</button>
      </div>
    </nav>
  );
}

const navlinks = [
  { name: "Home", route: "/" },
  { name: "Explore", route: "/explore" },
  { name: "Become a Seller", route: "/start-selling" },
  { name: "Sign in", route: "/login" },
];
