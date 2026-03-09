import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import authConfig from "./auth.config";

/**
 * PRODUCTION AUTH CONFIGURATION
 * Optimized for Cloudflare Pages (Edge Runtime) & Neon HTTP.
 */

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use Drizzle to store user accounts in Neon
  adapter: DrizzleAdapter(db),
  
  // MANDATORY for Cloudflare Pages: Database sessions are not supported on the Edge.
  // We use JWT to keep the session light and encrypted in the cookie.
  session: { strategy: "jwt" }, 

  ...authConfig,
  
  callbacks: {
    /**
     * The JWT callback runs whenever a token is created or updated.
     * We use this to "bake" the user's ID and Role into the encrypted cookie.
     */
    async jwt({ token, user, trigger }) {
      // 1. On initial Sign In
      if (user) {
        token.id = user.id;
        // Fetch the role directly from the DB at sign-in
        const [dbUser] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.id, user.id as string))
          .limit(1);
        token.role = dbUser?.role || "READER";
      }

      // 2. Role Sync (Requirement: Immediate update for manual SQL changes)
      // If we are not signing in but want to verify the role has not changed in the DB
      // We check this if the trigger is a "session" refresh or periodically.
      if (trigger === "update" || !token.role) {
        const [dbUser] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.id, token.id as string))
          .limit(1);
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },

    /**
     * The Session callback makes the data from the JWT available to the 
     * useSession() hook and the auth() function in your pages.
     */
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        // This makes 'session.user.role' accessible in your UI components
        session.user.role = token.role as "ADMIN" | "CONTRIBUTOR" | "READER";
      }
      return session;
    },
  },
  
  // Debugging in production (removes noise, shows only critical errors)
  debug: process.env.NODE_ENV === "development",
});