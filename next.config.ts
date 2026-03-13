import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
