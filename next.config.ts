/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // standalone е задължително за Docker
  output: 'standalone',
  images: {
    // Изключваме вградената оптимизация, за да не товарим Docker контейнера
    unoptimized: true,
  },
};

export default nextConfig;