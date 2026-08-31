"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

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

function getRegisteredUsers() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("drivefleet_registered_users");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  // Reactive subscription to external local storage session store
  const rawUserJson = useSyncExternalStore(subscribeUser, getStoredUserSnapshot, getServerUserSnapshot);

  const user = useMemo(() => {
    if (!rawUserJson) return null;
    try {
      return JSON.parse(rawUserJson);
    } catch {
      return null;
    }
  }, [rawUserJson]);

  // Persists active session state across app reloads and tabs
  const setLocalSession = (userData) => {
    if (typeof window !== "undefined") {
      if (userData) {
        localStorage.setItem("drivefleet_user", JSON.stringify(userData));
        localStorage.setItem("drivefleet_session", "active");
        document.cookie = `df_session=${encodeURIComponent(userData.email)}; path=/; max-age=86400`;
      } else {
        localStorage.removeItem("drivefleet_user");
        localStorage.removeItem("drivefleet_session");
        document.cookie = "df_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.dispatchEvent(new Event("drivefleet_session_change"));
    }
  };

  const registerWithEmail = async ({ name, email, photoURL, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existingUsers = getRegisteredUsers();

    if (existingUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("An account with this email already exists. Please sign in.");
    }

    const newUser = {
      name: name || cleanEmail.split("@")[0] || "User",
      email: cleanEmail,
      image: photoURL || "",
      password: password,
    };

    // Save user to registered accounts storage WITHOUT logging in automatically
    const updatedUsers = [...existingUsers, newUser];
    if (typeof window !== "undefined") {
      localStorage.setItem("drivefleet_registered_users", JSON.stringify(updatedUsers));
    }

    return { data: { user: newUser }, error: null };
  };

  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    // Verify user registration in registered users list
    let foundUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      throw new Error("No registered account found with this email. Please register first.");
    }

    if (foundUser.password && foundUser.password !== password) {
      throw new Error("Incorrect password. Please check your credentials.");
    }

    const sessionUser = {
      name: foundUser.name,
      email: foundUser.email,
      image: foundUser.image || "",
    };

    // Save and dispatch active logged-in session state
    setLocalSession(sessionUser);
    return { data: { user: sessionUser }, error: null };
  };

  const loginWithGoogle = async (googleEmail) => {
    const email = (googleEmail || "google.user@gmail.com").trim().toLowerCase();
    const rawName = email.split("@")[0] || "Google User";
    const formattedName = rawName.replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const sessionUser = {
      name: formattedName,
      email,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      emailVerified: true,
    };

    // Store in registered users list and save active logged-in session
    const registeredUsers = getRegisteredUsers();
    if (!registeredUsers.some((u) => u.email.toLowerCase() === email)) {
      const updated = [...registeredUsers, { ...sessionUser, password: "google_social_auth" }];
      if (typeof window !== "undefined") {
        localStorage.setItem("drivefleet_registered_users", JSON.stringify(updated));
      }
    }

    setLocalSession(sessionUser);
    return { data: { user: sessionUser }, error: null };
  };

  const logout = async () => {
    setLocalSession(null);
  };

  const value = {
    user,
    loading: false,
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
