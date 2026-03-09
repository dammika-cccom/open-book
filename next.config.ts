import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  experimental: {
    // Aggressively remove unused code
    optimizePackageImports: ['lucide-react'],
  },
  // Block these from the bundle
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path'],
};

export default nextConfig;