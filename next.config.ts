import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ТОВА Е КРИТИЧНИЯТ РЕД:
  output: 'standalone', 

  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb", 
    },
  },
};

export default nextConfig;