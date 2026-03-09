import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  
  // Requirement: Block these giants from ever entering the Worker code
  serverExternalPackages: [
    'pg', 
    'dotenv', 
    'fs', 
    'path', 
    'ws', 
    'sanitize-html', 
    'lucide-react'
  ],

  experimental: {
    // Force the compiler to discard unused code paths
    optimizePackageImports: [
      '@neondatabase/serverless',
      'drizzle-orm'
    ],
  }
};

export default nextConfig;