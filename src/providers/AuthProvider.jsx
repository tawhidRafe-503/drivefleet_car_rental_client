"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return null;
      }

      const stored = localStorage.getItem("drivefleet_user");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Failed to load user session", err);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const syncedFor = useRef(null);

  const setLocalSession = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("drivefleet_user", JSON.stringify(userData));
      document.cookie = `df_session=${encodeURIComponent(userData.email)}; path=/; max-age=86400`;
    } else {
      localStorage.removeItem("drivefleet_user");
      document.cookie = "df_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const syncJwtCookie = async (email) => {
    try {
      await fetch(`${API_URL}/auth/jwt`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Ignore network errors
    }
  };

  useEffect(() => {
    const email = user?.email;
    if (email && syncedFor.current !== email) {
      syncedFor.current = email;
      syncJwtCookie(email);
    }
    if (!email) {
      syncedFor.current = null;
    }
  }, [user?.email]);

  const clearJwtCookie = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore
    }
  };

  const loginWithEmail = async (email, password) => {
    const userData = {
      name: email.split("@")[0] || "User",
      email,
      image: "",
    };
    setLocalSession(userData);
    await syncJwtCookie(email);
    return { data: { user: userData }, error: null };
  };

  const registerWithEmail = async ({ name, email, photoURL, password }) => {
    const userData = {
      name: name || email.split("@")[0] || "User",
      email,
      image: photoURL || "",
    };
    setLocalSession(userData);
    await syncJwtCookie(email);
    return { data: { user: userData }, error: null };
  };

  const loginWithGoogle = async (googleEmail) => {
    const email = googleEmail?.trim() || "google.user@gmail.com";
    const rawName = email.split("@")[0] || "Google User";
    const formattedName = rawName.replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const userData = {
      name: formattedName,
      email,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      emailVerified: true,
    };

    setLocalSession(userData);
    await syncJwtCookie(userData.email);

    return { data: { user: userData }, error: null };
  };

  const logout = async () => {
    setLocalSession(null);
    await clearJwtCookie();
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    syncJwtCookie,
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
