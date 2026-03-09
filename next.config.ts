import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true 
  },
  productionBrowserSourceMaps: false,
  
  // Requirement: Block Node.js modules from the Edge Worker
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path', 'ws', 'sanitize-html'],

  // Fix: Correct way to handle ESLint in Next.js Config
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;