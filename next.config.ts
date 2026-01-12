import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Увеличаваме лимитите за големи файлове
  serverExternalPackages: ["sharp"], // За по-бърза обработка на снимки
  
  images: {
    unoptimized: true, // Важно за твоя бизнес, за да се виждат детайлите на снимките без компресия
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  
  // Експериментално за вдигане на лимитите за Body Size в API маршрутите
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb", // Позволява качване на много снимки наведнъж
    },
  },
};

export default nextConfig;