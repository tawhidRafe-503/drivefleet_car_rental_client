"use client";

import { createAuthClient } from "better-auth/react";

// BetterAuth React client — exposes useSession, signIn, signOut, signUp.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp } = authClient;
