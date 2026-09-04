"use client";

import { useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000`;
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
