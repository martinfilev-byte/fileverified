import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Използваме само локални снимки от public/, така че не ни трябват remotePatterns
};

export default nextConfig;