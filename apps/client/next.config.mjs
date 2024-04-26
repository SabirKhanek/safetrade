/** @type {import('next').NextConfig} */
import path from "path";
import { config } from "dotenv";
config({ path: path.join(process.cwd(), "..", "..", ".env") });

const nextConfig = {
  transpilePackages: ["api-contract", "db-schema"],
};

export default nextConfig;
