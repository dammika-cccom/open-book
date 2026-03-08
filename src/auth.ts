import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" }, 
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      // If we have a user object (only happens on sign in)
      if (user) {
        token.id = user.id;
      }
      
      // Fetch the LATEST role from the database every time the token is handled
      // This ensures manual DB updates (like your SQL command) take effect immediately
      if (token.id) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.id, token.id as string))
          .limit(1);

        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as "ADMIN" | "CONTRIBUTOR" | "READER";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});