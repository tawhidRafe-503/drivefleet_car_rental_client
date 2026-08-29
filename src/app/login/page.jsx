"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } catch {
      toast.error("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle("google.user@gmail.com");
      toast.success("Logged in with Google!");
      router.push(redirectTo);
    } catch {
      toast.error("Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#071427]/90 p-8 shadow-2xl backdrop-blur-md">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold text-white">Welcome Back</h1>
        <p className="mt-2 text-xs text-slate-400">
          Sign in to your DriveFleet account to manage bookings and cars
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/25 disabled:opacity-50"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>

      <p className="mt-6 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-xs text-slate-400">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}