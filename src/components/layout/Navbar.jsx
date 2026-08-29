"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenu, HiOutlineX, HiOutlineUser, HiChevronDown } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import ThemeToggle from "../shared/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore cars" },
  { href: "/add-car", label: "Add car", private: true },
  { href: "/my-bookings", label: "My bookings", private: true },
  { href: "/my-cars", label: "My added cars", private: true },
];

function subscribeMounted() {
  return () => {};
}
function getMountedSnapshot() {
  return true;
}
function getServerMountedSnapshot() {
  return false;
}

function UserAvatar({ user }) {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = !imgError && (user?.image || user?.photoURL || user?.picture);
  const initials = (user?.name || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-500/40 bg-linear-to-tr from-cyan-600 to-blue-600 font-semibold text-white shadow-sm">
      {avatarUrl ? (
        <Image
          width={32}
          height={32}
          src={avatarUrl}
          alt={user?.name || "User Avatar"}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : initials ? (
        <span className="text-xs font-bold text-white">{initials}</span>
      ) : (
        <HiOutlineUser size={16} />
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getServerMountedSnapshot);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    if (menuOpen) setMenuOpen(false);
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleLinkClick = (e, link) => {
    setUserDropdownOpen(false);
    if (link.private && !user) {
      e.preventDefault();
      toast.error("Please log in to access this page");
      router.push(`/login?redirectTo=${encodeURIComponent(link.href)}`);
      if (menuOpen) setMenuOpen(false);
    } else {
      if (menuOpen) setMenuOpen(false);
    }
  };

  return (
    <header className="theme-header sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-display flex items-center gap-2.5 text-xl font-bold theme-text group">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-cyan-400/30 bg-linear-to-br from-cyan-400/20 to-blue-600/20 p-0.5 shadow-md shadow-cyan-500/10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=120&q=80"
              alt="DriveFleet Car Logo"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <span>DriveFleet</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`text-sm font-medium transition ${
                pathname === link.href ? "text-cyan-500 font-semibold" : "theme-text-muted hover:theme-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!mounted || loading ? (
            <div className="h-9 w-20 rounded-full border border-cyan-500/20 bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="theme-card flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition hover:opacity-90 focus:outline-none cursor-pointer"
              >
                <UserAvatar user={user} />
                <span className="text-sm font-medium">{user.name?.split(" ")[0] || "Account"}</span>
                <HiChevronDown
                  className={`theme-text-muted transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              {userDropdownOpen && (
                <div className="theme-card absolute right-0 top-full mt-2 w-56 rounded-2xl border p-2 shadow-2xl backdrop-blur-md z-50">
                  <div className="border-b theme-border px-3 py-2">
                    <p className="text-xs font-semibold theme-text truncate">{user.name || "User"}</p>
                    <p className="text-[11px] theme-text-muted truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/add-car"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-xs font-medium theme-text transition hover:bg-cyan-500/10"
                    >
                      Add car
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-xs font-medium theme-text transition hover:bg-cyan-500/10"
                    >
                      My bookings
                    </Link>
                    <Link
                      href="/my-cars"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-xs font-medium theme-text transition hover:bg-cyan-500/10"
                    >
                      My added cars
                    </Link>
                  </div>
                  <div className="border-t theme-border pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-500 transition hover:bg-rose-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="p-1 theme-text" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="theme-card border-t px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {!mounted || loading ? null : user ? (
              <div className="mb-1 flex items-center gap-3 border-b theme-border pb-3">
                <UserAvatar user={user} />
                <div>
                  <p className="text-sm font-semibold theme-text">{user.name || "User"}</p>
                  <p className="text-xs theme-text-muted">{user.email}</p>
                </div>
              </div>
            ) : null}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-base transition ${
                  pathname === link.href ? "text-cyan-500 font-semibold" : "theme-text-muted hover:theme-text"
                }`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.label}
              </Link>
            ))}
            {!mounted || loading ? null : user ? (
              <button
                className="mt-2 rounded-xl border border-rose-500/40 bg-rose-500/10 py-2.5 text-center text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="mt-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
