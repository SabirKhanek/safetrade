import path from "path";
import { config } from "dotenv";
config({ path: path.join(process.cwd(), "..", "..", ".env") });
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["api-contract", "db-schema"],
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["safetrade.cloud"],
    },
  },
};

export default nextConfig;
