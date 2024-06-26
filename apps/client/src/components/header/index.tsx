"use client";
import Link from "next/link";
import "./header_styles.css";
import { SafetradeLogoFull } from "../logoFull";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navlinks } from "./data/navlinks";
import { Turn as Hamburger } from "hamburger-react";
import { NavMenuFull } from "./nav-menu";
import { motion } from "framer-motion";
import { useAuthState } from "../providers/authstate-provider";
import { useRouter } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("");
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const authState = useAuthState();
  const router = useRouter();
  const needAttachRoutes = ["/"];
  const needAttachment = needAttachRoutes.includes(pathname);
  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, [pathname]);
  return (
    <>
      <nav className={`main-header ${needAttachment ? "header-attached" : ""}`}>
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
            let isActive = activeRoute === link.route;
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
          {
            <motion.button
              onClick={() =>
                router.push(authState.isLoggedIn ? "/dashboard" : "/register")
              }
              whileTap={{ scale: 0.95 }}
              className="header-cta hidden xsm:block rounded-lg"
            >
              {authState.isLoggedIn ? "Dashboard" : "Get Started"}
            </motion.button>
          }
        </div>
      </nav>
      <NavMenuFull
        isOpened={isNavMenuOpened}
        setIsOpened={setIsNavMenuOpened}
      ></NavMenuFull>
    </>
  );
}
