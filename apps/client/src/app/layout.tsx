import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "../styles/globals.css";
import { ReactQueryClientProvider } from "../react-query-client";
import NoSSR from "../components/NoSSR";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GSAPRegistrations } from "../components/gsap_config";

import NextTopLoader from "nextjs-toploader";
import { AuthStateProvider } from "@/components/providers/authstate-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
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
    <ThemeProvider>
      <ReactQueryClientProvider>
        <AuthStateProvider>
          <html lang="en">
            <body
              className={`${inter.variable} ${poppins.variable} ${montesserat.variable}`}
            >
              <>
                <main>
                  <NextTopLoader
                    height={4}
                    color="hsl(var(--primary))"
                    showSpinner
                  ></NextTopLoader>
                  <GSAPRegistrations></GSAPRegistrations>
                  {children}
                </main>
                <Toaster></Toaster>
                <NoSSR>
                  <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-left"
                  ></ReactQueryDevtools>
                </NoSSR>
              </>
            </body>
          </html>
        </AuthStateProvider>
      </ReactQueryClientProvider>
    </ThemeProvider>
  );
}
