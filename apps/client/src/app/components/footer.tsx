import Image from "next/image";
import Link from "next/link";
import { HTMLProps } from "react";
import {
  FaXTwitter,
  FaDiscord,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { SafetradeLogoFull } from "./logoFull";

export interface FooterProps extends HTMLProps<HTMLElement> {
  children?: React.ReactNode;
}

export function Footer({ children, ...props }: FooterProps) {
  return (
    <section className="relative overflow-hidden">
      {/* <div className="h-[75%] absolute bottom-0 right-0 translate-y-1/2  gradient aspect-square -z-[1] blur-3xl translate-x-1/2 "></div>
      <div className="h-[75%] absolute top-0 left-0 -translate-y-1/2  gradient aspect-square -z-[1] blur-3xl -translate-x-1/2 "></div> */}

      {/* <div className="h-[75%] absolute bottom-0 left-0 translate-y-1/2  gradient aspect-square -z-[1] blur-3xl -translate-x-1/2 "></div>
      <div className="h-[75%] absolute top-0 right-0 -translate-y-1/2  gradient aspect-square -z-[1] blur-3xl translate-x-1/2 "></div> */}
      <div className="absolute inset-0 top-0 left-0 flex justify-center items-center">
        <svg
          className="h-[90%] animate-[spin_10s_linear_infinite] "
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--primary)" }} />
              <stop offset="35%" style={{ stopColor: "var(--secondary)" }} />
              <stop offset="100%" style={{ stopColor: "var(--accent)" }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M29.4,-58.6C36.9,-46.6,41.1,-36.3,50,-26.9C58.9,-17.4,72.6,-8.7,74.4,1C76.1,10.7,65.9,21.4,58,32.7C50.2,44.1,44.7,56,35.4,63.4C26.1,70.8,13.1,73.7,-1.3,76C-15.7,78.3,-31.4,79.9,-41,72.7C-50.7,65.5,-54.4,49.5,-62.4,35.9C-70.4,22.4,-82.7,11.2,-85.9,-1.9C-89.1,-14.9,-83.3,-29.8,-71.8,-37.3C-60.3,-44.7,-43.1,-44.8,-30.2,-53.7C-17.2,-62.6,-8.6,-80.3,1.2,-82.3C10.9,-84.3,21.9,-70.6,29.4,-58.6Z"
            transform="matrix(1, 0, 0, 1, 100, 100)"
          >
            <animateTransform
              type="rotate"
              additive="sum"
              attributeName="transform"
              values="0;360"
              begin="-0.1s"
              dur="11.98s"
              fill="freeze"
              keyTimes="0; 1"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <div
        {...(props as any)}
        className={`${props.className || ""} relative footer-section isolate pb-2 pt-12 grey-blur`}
      >
        <div className="container">
          <div className="flex gap-6 pt-5 pb-10 items-start justify-between flex-wrap">
            <div className="footer-brand min-w-60  max-w-80">
              <SafetradeLogoFull className="h-10" />
              <p className="my-3">
                Join SafeTrade today and experience the benefits of a secure
                sellers ecosystem.
              </p>
              <p className=" ">
                <Link
                  className="hover:text-black underline-effect text-black/60"
                  href={"mailto:support@safetrade.cloud"}
                >
                  support@safetrade.cloud
                </Link>
              </p>
              <p className=" ">
                <Link
                  className="hover:text-black underline-effect text-black/60 "
                  href={"mailto:support@safetrade.cloud"}
                >
                  DCS, Government College University
                </Link>
              </p>
            </div>
            {footerLinks.map((l, i) => {
              return (
                <div key={i} className="flex flex-col min-w-36 gap-1">
                  {l.map((link, i) => {
                    return (
                      <Link
                        key={i}
                        className="text-black/60 transition-all duration-300 hover:text-black"
                        href={link.target}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="flex items-center  justify-between gap-10 flex-wrap">
            <ul className="flex gap-5 flex-wrap max-xsm:text-sm text-black/60">
              <li>&copy; 2024 Safetrade Market. All rights reserved.</li>
              <li className="hover:text-black underline-effect">
                <Link href="#">Terms of Service</Link>
              </li>
              <li className="hover:text-black underline-effect">
                <Link href="#">Privacy Policy</Link>
              </li>
              <li className="hover:text-black underline-effect">
                <Link href="#">DCMA</Link>
              </li>
            </ul>
            <ul className="flex gap-3 justify-center max-ml:w-full text-black/60">
              {social_links.map((li, i) => (
                <Link
                  className="hover:text-black hover:scale-110 transition-all duration-150"
                  key={i}
                  href={li.target}
                >
                  <li.icon />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerLinks = [
  [
    { name: "Help Center", target: "/help" },
    { name: "Contact Us", target: "/contact" },
    { name: "24/7 Live support", target: "/support" },
    { name: "Articles", target: "/articles" },
  ],
  [
    { name: "Safetrade's buyer protection", target: "#" },
    { name: "Safetrade's seller protection", target: "#" },
    { name: "Deposits", target: "#" },
    { name: "Withdrawls", target: "#" },
  ],
  [
    { name: "Seller Guidelines", target: "#" },
    { name: "Fees", target: "#" },
    { name: "Dispute Resolution", target: "#" },
    { name: "Refund Policy", target: "#" },
  ],
];
const social_links = [
  { name: "Facebook", target: "#", icon: FaFacebook },
  { name: "Facebook", target: "#", icon: FaInstagram },
  { name: "Discord", target: "#", icon: FaDiscord },
  { name: "X", target: "#", icon: FaXTwitter },
];
