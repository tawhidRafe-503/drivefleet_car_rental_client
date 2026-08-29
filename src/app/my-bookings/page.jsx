"use client";

import Link from "next/link";

export default function MyBookingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-white mb-2">My Bookings</h1>
      <p className="text-slate-400 text-sm mb-8">Manage your active, upcoming, and past car rentals.</p>

      <div className="rounded-2xl border border-white/10 bg-[#071427] p-12 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          🏎️
        </div>
        <h3 className="font-display text-lg font-bold text-white">No Bookings Found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          You haven&apos;t booked any vehicles yet. Explore our fleet and book your next journey today!
        </p>
        <Link
          href="/cars"
          className="inline-block mt-6 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
        >
          Explore Cars
        </Link>
      </div>
    </div>
  );
}
