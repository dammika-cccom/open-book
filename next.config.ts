import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true }, // Saves space on image processing code
  experimental: {
    // This tells Next.js 16 to be extremely aggressive with pruning
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure these are never bundled
  serverExternalPackages: ['pg', 'ws', 'fs', 'path', 'dotenv', 'sanitize-html'],
};

export default nextConfig;