import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  
  // Requirement: Aggressively block heavy Node modules from the Edge Worker
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path', 'ws', 'sanitize-html'],
  
  // We removed 'transpilePackages' and 'optimizePackageImports' for lucide 
  // because we are not using the library anymore.
};

export default nextConfig;