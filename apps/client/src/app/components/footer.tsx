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

      <div className="h-[75%] absolute bottom-0 left-0 translate-y-1/2  gradient aspect-square -z-[1] blur-3xl -translate-x-1/2 "></div>
      <div className="h-[75%] absolute top-0 right-0 -translate-y-1/2  gradient aspect-square -z-[1] blur-3xl translate-x-1/2 "></div>

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
                  className="hover:text-black text-black/60 hover:underline"
                  href={"mailto:support@safetrade.cloud"}
                >
                  support@safetrade.cloud
                </Link>
              </p>
              <p className=" ">
                <Link
                  className="hover:text-black text-black/60 hover:underline"
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
                        className="text-black/60 transition-all duration-300 hover:underline hover:text-black"
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
              <li className="hover:text-black">
                <Link href="#">Terms of Service</Link>
              </li>
              <li className="hover:text-black">
                <Link href="#">Privacy Policy</Link>
              </li>
              <li className="hover:text-black">
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
