import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
  },
};

export default nextConfig;
