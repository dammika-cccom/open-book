import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Requirement: Enable standalone mode for smaller bundles
  output: 'standalone',
  // Disable source maps in production to save space
  productionBrowserSourceMaps: false,
  // Ensure lucide icons are optimized
  transpilePackages: ['lucide-react']
};

export default nextConfig;