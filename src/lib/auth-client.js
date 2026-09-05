"use client";
import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// BetterAuth React client — exposes useSession, signIn, signOut, signUp.
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    jwtClient()
  ]
});

export const { useSession, signIn, signOut, signUp } = authClient;
