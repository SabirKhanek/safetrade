import { black } from "cli-color";
import type { Config } from "tailwindcss";
import realtimeColors from "tailwind-plugin-realtime-colors";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        inter: "var(--font-inter)",
        montserrat: "var(--font-montserrat)",
      },

      screens: {
        ml: "425px",
        xsm: "375px",
      },
    },
  },

  plugins: [
    realtimeColors(
      "https://www.realtimecolors.com/?colors=140507-fefbfb-9a00bd-fab7f0-ffa600&fonts=Inter-Poppins",
      {
        shades: ["text", "accent", "background", "primary", "secondary"],
      }
    ),
  ],
};
export default config;
