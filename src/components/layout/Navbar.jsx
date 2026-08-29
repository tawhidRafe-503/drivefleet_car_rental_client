"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenu, HiOutlineX, HiOutlineUser } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import LoadingSpinner from "../shared/LoadingSpinner";
import ThemeToggle from "../shared/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore cars" },
  { href: "/add-car", label: "Add car", private: true },
  { href: "/my-bookings", label: "My bookings", private: true },
  { href: "/my-cars", label: "My added cars", private: true },
];

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
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-400/40 bg-linear-to-tr from-cyan-600 to-blue-600 font-semibold text-white shadow-sm">
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

  const handleLogout = async () => {
    if (menuOpen) setMenuOpen(false);
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleLinkClick = (e, link) => {
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071427]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-display flex items-center gap-2.5 text-xl font-bold text-white group">
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
                pathname === link.href ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {loading ? (
            <LoadingSpinner />
          ) : user ? (
            <div className="dropdown dropdown-end relative">
              <label
                tabIndex={0}
                className="btn btn-ghost flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white hover:bg-white/15"
              >
                <UserAvatar user={user} />
                <span className="text-sm font-medium">{user.name?.split(" ")[0] || "Account"}</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-100 mt-2 w-52 rounded-xl border border-white/15 bg-[#0b1d36] p-2 text-slate-200 shadow-2xl backdrop-blur-md"
              >
                <li>
                  <Link href="/add-car" className="hover:bg-white/10 hover:text-white rounded-lg">
                    Add car
                  </Link>
                </li>
                <li>
                  <Link href="/my-bookings" className="hover:bg-white/10 hover:text-white rounded-lg">
                    My bookings
                  </Link>
                </li>
                <li>
                  <Link href="/my-cars" className="hover:bg-white/10 hover:text-white rounded-lg">
                    My added cars
                  </Link>
                </li>
                <li className="border-t border-white/10 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-lg px-3 py-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
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
          <button className="p-1 text-white" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#071427] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {user && (
              <div className="mb-1 flex items-center gap-3 border-b border-white/10 pb-3">
                <UserAvatar user={user} />
                <div>
                  <p className="text-sm font-semibold text-white">{user.name || "User"}</p>
                  <p className="text-xs text-white/60">{user.email}</p>
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-base transition ${
                  pathname === link.href ? "text-cyan-400 font-semibold" : "text-white/85 hover:text-white"
                }`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                className="mt-2 rounded-xl border border-rose-500/40 bg-rose-500/10 py-2.5 text-center text-sm font-semibold text-rose-300 transition hover:bg-rose-500 hover:text-white"
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
