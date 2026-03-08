import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimization: Standalone mode reduces the output size significantly
  output: 'standalone',
  
  // Disable source maps to save code space
  productionBrowserSourceMaps: false,
  
  // Requirement: Ensure icons are optimized
  transpilePackages: ['lucide-react'],

  // CRITICAL: Tell the bundler to NEVER include 'pg' or 'dotenv' in the edge worker
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path'],
  
  experimental: {
    // This helps Next.js 16 trim unused code
    optimizePackageImports: ['lucide-react', 'lucide'],
  },
};

export default nextConfig;