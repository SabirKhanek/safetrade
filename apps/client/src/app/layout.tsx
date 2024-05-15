import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./react-query-client";
import NoSSR from "./components/NoSSR";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GSAPRegistrations } from "./components/gsap_config";
import Header from "./components/header";
import { Footer } from "./components/footer";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
const montesserat = Montserrat({
  weight: ["300", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Safetrade",
  description:
    "Safetrade.cloud is an innoovative escrow protected marketplace for buyers, sellers, digital creators and freelancers.",
  authors: { name: "Sabir Khan", url: "https://github.com/sabirkhanek" },
  icons: {
    icon: [
      { type: "image/svg+xml", rel: "icon", url: "/assets/images/favicon.svg" },
    ],
  },
  applicationName: "Safetrade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${poppins.variable} ${montesserat.variable}`}
        >
          <>
            <main>
              <NextTopLoader
                template={`
                <div class="bar" role="bar">
                  <div class="peg"></div>
                </div> 
                <div class="spinner" role="spinner">
                  <div class="spinner-icon"></div>
                </div>`}
                color="var(--accent)"
                showSpinner
              ></NextTopLoader>
              <GSAPRegistrations></GSAPRegistrations>
              <Header></Header>
              {children}
              <Footer></Footer>
            </main>

            <NoSSR>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-left"
              ></ReactQueryDevtools>
            </NoSSR>
          </>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
