// apps/cms/auth.ts
import NextAuth from "next-auth"
import { baseAuthOptions } from "@repo/db/auth-config"
import type { NextAuthConfig } from "next-auth"

const authOptions = {
  ...baseAuthOptions,
  pages: { 
    signIn: "/auth/signin",
    error: "/auth/error" 
  },
  callbacks: {
    ...baseAuthOptions.callbacks,
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      const isAdmin = (auth?.user as any)?.role === 'ADMIN';
      if (isOnDashboard) {
        if (isLoggedIn && isAdmin) return true;
        return false; // Redirect to login page if not admin
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
  },
} as NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
export { authOptions }
