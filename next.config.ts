import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  productionBrowserSourceMaps: false, // Saves space
  
  // Requirement: Ensure Node modules are 100% excluded
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path', 'ws', 'sanitize-html'],
  
  experimental: {
    // This removes unused code paths in Next 16
    optimizePackageImports: ['lucide-react', 'lucide'],
  }
};

export default nextConfig;