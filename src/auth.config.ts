import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [Google],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnBookmarks = nextUrl.pathname.startsWith('/book/my-bookmarks');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      // 1. Force login for Bookmarks and Admin areas
      if (isOnBookmarks || isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirects to login page
      }

      // 2. Allow public access to everything else
      return true;
    },
  },
} satisfies NextAuthConfig;