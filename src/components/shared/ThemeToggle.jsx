"use client";

import { useEffect, useSyncExternalStore } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

function subscribeTheme(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("drivefleet_theme_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("drivefleet_theme_change", callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("drivefleet_theme") || "dark";
}

function getServerThemeSnapshot() {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("drivefleet_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("drivefleet_theme_change"));
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-card flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <HiSun className="text-amber-400 transition-transform duration-300 hover:rotate-45" size={18} />
      ) : (
        <HiMoon className="text-indigo-600 transition-transform duration-300" size={18} />
      )}
    </button>
  );
}
