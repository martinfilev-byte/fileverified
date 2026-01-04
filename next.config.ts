import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // remotePatterns вече не са нужни за локални файлове
};

export default nextConfig;