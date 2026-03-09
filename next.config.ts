import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  
  // Requirement: Prevent heavy Node modules from entering the Cloudflare Worker
  serverExternalPackages: ['pg', 'dotenv', 'fs', 'path', 'ws', 'sanitize-html'],

  // Note: 'lucide-react' removed from here to fix the build conflict.
};

export default nextConfig;