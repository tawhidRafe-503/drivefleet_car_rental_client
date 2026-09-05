"use client";

import { createContext, useContext, useMemo } from "react";
import { signIn, signOut, signUp, useSession } from "@/lib/auth-client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // BetterAuth React useSession hook for real authenticated sessions
  const sessionState = useSession();
  const betterAuthUser = sessionState?.data?.user;

  const user = useMemo(() => {
    if (!betterAuthUser) return null;
    return {
      name: betterAuthUser.name || betterAuthUser.email?.split("@")[0] || "User",
      email: betterAuthUser.email,
      image: betterAuthUser.image || "",
    };
  }, [betterAuthUser]);

  const registerWithEmail = async ({ name, email, photoURL, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await signUp.email({
        email: cleanEmail,
        password: password,
        name: name || cleanEmail.split("@")[0] || "User",
        image: photoURL || "",
      });

      if (res?.error) {
        throw new Error(res.error.message || "Registration failed. Please check your details.");
      }

      return { data: { user: { name, email: cleanEmail, image: photoURL } }, error: null };
    } catch (err) {
      if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
        throw new Error("Cannot connect to auth service. Please make sure the Next.js server is running on http://localhost:3000.");
      }
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await signIn.email({
        email: cleanEmail,
        password: password,
      });

      if (res?.error) {
        throw new Error(res.error.message || "Invalid email or password.");
      }

      return { data: { user: { email: cleanEmail } }, error: null };
    } catch (err) {
      if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
        throw new Error("Cannot connect to auth service. Please check your connection or server status.");
      }
      throw err;
    }
  };

  const loginWithGoogle = async (callbackURL = "/") => {
    return await signIn.social({
      provider: "google",
      callbackURL: callbackURL,
    });
  };

  const logout = async () => {
    try {
      await signOut();
    } catch {
      // Ignore
    }
  };

  const value = {
    user,
    loading: sessionState?.isPending || false,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
