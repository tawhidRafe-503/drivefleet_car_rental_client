"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Logged in successfully!");
      router.push(redirectTo);
    } catch (err) {
      toast.error(err?.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle(redirectTo);
    } catch (err) {
      toast.error(err?.message || "Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-card w-full max-w-md rounded-3xl border p-8 shadow-2xl backdrop-blur-md">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold theme-text">Welcome Back</h1>
        <p className="mt-2 text-xs theme-text-muted">
          Sign in to your DriveFleet account to manage bookings and cars
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider theme-text mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="theme-card w-full rounded-xl border py-3 pl-10 pr-4 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-wider theme-text mb-1.5">
            Password
          </label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="theme-card w-full rounded-xl border py-3 pl-10 pr-10 text-sm focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 theme-text-muted hover:theme-text transition cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 theme-border border-t" />
        <span className="text-[11px] font-semibold uppercase tracking-widest theme-text-muted">or</span>
        <div className="h-px flex-1 theme-border border-t" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="theme-card flex w-full items-center justify-center gap-2.5 rounded-xl border py-3 text-sm font-semibold transition hover:border-cyan-500 disabled:opacity-50 cursor-pointer"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>

      <p className="mt-6 text-center text-xs theme-text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-cyan-500 hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center theme-bg px-4 py-12">
      <Suspense fallback={<div className="text-xs theme-text-muted">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}