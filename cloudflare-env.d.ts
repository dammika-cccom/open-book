// This file provides type safety for the Cloudflare Pages environment.
// It explicitly defines the environment variables to satisfy ESLint and TypeScript.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Database connection string for Neon Cloud */
      DATABASE_URL: string;

      /** Secret key for Auth.js session encryption */
      AUTH_SECRET: string;

      /** Google OAuth Client ID */
      AUTH_GOOGLE_ID: string;

      /** Google OAuth Client Secret */
      AUTH_GOOGLE_SECRET: string;

      /** The base URL of the deployed application */
      AUTH_URL: string;

      /** Next.js 16 specific configuration flag */
      NEXTJS_POSTCONFIG_V4?: string;
      
      /** Catch-all for other environment variables */
      [key: string]: string | undefined;
    }
  }
}

// Export empty object to turn this file into a module
export {};