import NextAuth from "next-auth";
import authConfig from "./auth.config";

// We export the middleware function directly as required by Next 16
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Pattern to match all paths except static files, images, and internal Next.js paths
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};