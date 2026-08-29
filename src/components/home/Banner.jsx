"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineClock } from "react-icons/hi";

export default function Banner() {
  const { user } = useAuth();
  const router = useRouter();

  const handleListCarsClick = (e) => {
    e.preventDefault();
    if (user) {
      router.push("/my-cars");
    } else {
      toast.error("Please log in to access your added cars page");
      router.push(`/login?redirectTo=${encodeURIComponent("/my-cars")}`);
    }
  };

  return (
    <section className="relative overflow-hidden theme-bg pt-16 theme-text md:pt-24 transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #2f9be0, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-100 w-100 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content & CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-500">
              <HiOutlineSparkles className="text-cyan-500" size={14} />
              1,000+ Vehicles · 24/7 Support
            </div>

            <h1 className="font-display mt-5 text-4xl font-extrabold leading-tight theme-text md:text-5xl lg:text-6xl">
              Explore the open road. Rent your <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">perfect journey.</span>
            </h1>

            <p className="mt-5 text-base theme-text-muted md:text-lg">
              Book verified cars from trusted local owners — transparent pricing, instant
              confirmation, and zero hidden fees.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/cars"
                className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                Explore cars
              </Link>
              <button
                type="button"
                onClick={handleListCarsClick}
                className="theme-card rounded-xl border px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-cyan-500 cursor-pointer"
              >
                List your cars
              </button>
            </div>
          </div>

          {/* Right Column: Hero Car Image with Floating Specs Badges */}
          <div className="relative">
            <div className="theme-card relative mx-auto h-80 w-full max-w-lg overflow-hidden rounded-3xl border p-2 shadow-2xl backdrop-blur sm:h-95 lg:h-105">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
                  alt="DriveFleet Luxury Sports Car"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1: Instant Booking */}
              <div className="theme-card absolute left-6 top-6 flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-xl backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-500">
                  <HiOutlineClock size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold theme-text">Instant Booking</p>
                  <p className="text-[10px] theme-text-muted">Ready in 2 minutes</p>
                </div>
              </div>

              {/* Floating Badge 2: Verified Owner */}
              <div className="theme-card absolute bottom-6 right-6 flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-xl backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500">
                  <HiOutlineShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold theme-text">100% Insured</p>
                  <p className="text-[10px] theme-text-muted">Full coverage safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detached Standalone Stats Bar Below Banner */}
      <div className="theme-card relative mt-16 border-t py-8 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-2">
              <p className="font-display text-3xl font-extrabold text-cyan-500 md:text-4xl">500+</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider theme-text-muted md:text-sm">Verified Cars</p>
            </div>
            <div className="border-x theme-border p-2">
              <p className="font-display text-3xl font-extrabold text-cyan-500 md:text-4xl">10k+</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider theme-text-muted md:text-sm">Happy Drivers</p>
            </div>
            <div className="p-2">
              <p className="font-display text-3xl font-extrabold text-cyan-500 md:text-4xl">4.9 ★</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider theme-text-muted md:text-sm">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
