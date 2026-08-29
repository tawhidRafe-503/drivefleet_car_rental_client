"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useSyncExternalStore } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AuthContext = createContext(null);

function getStoredUserSnapshot() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("drivefleet_user");
}

function getServerUserSnapshot() {
  return null;
}

function subscribeUser(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("drivefleet_session_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("drivefleet_session_change", callback);
  };
}

export function AuthProvider({ children }) {
  const syncedFor = useRef(null);

  // Subscribe to local storage external store without calling setState in an effect
  const rawUserJson = useSyncExternalStore(subscribeUser, getStoredUserSnapshot, getServerUserSnapshot);

  const user = useMemo(() => {
    if (!rawUserJson) return null;
    try {
      return JSON.parse(rawUserJson);
    } catch {
      return null;
    }
  }, [rawUserJson]);

  const setLocalSession = (userData) => {
    if (userData) {
      localStorage.setItem("drivefleet_user", JSON.stringify(userData));
      document.cookie = `df_session=${encodeURIComponent(userData.email)}; path=/; max-age=86400`;
    } else {
      localStorage.removeItem("drivefleet_user");
      document.cookie = "df_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("drivefleet_session_change"));
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
      // Ignore network errors asynchronously
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
    syncJwtCookie(email);
    return { data: { user: userData }, error: null };
  };

  const registerWithEmail = async ({ name, email, photoURL, password }) => {
    const userData = {
      name: name || email.split("@")[0] || "User",
      email,
      image: photoURL || "",
    };
    setLocalSession(userData);
    syncJwtCookie(email);
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
    syncJwtCookie(userData.email);

    return { data: { user: userData }, error: null };
  };

  const logout = async () => {
    setLocalSession(null);
    clearJwtCookie();
  };

  const value = {
    user,
    loading: false,
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
