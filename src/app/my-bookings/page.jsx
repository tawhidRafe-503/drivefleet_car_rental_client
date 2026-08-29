"use client";

import Link from "next/link";

export default function MyBookingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 theme-bg min-h-[80vh]">
      <h1 className="font-display text-3xl font-bold theme-text mb-2">My Bookings</h1>
      <p className="theme-text-muted text-sm mb-8">Manage your active, upcoming, and past car rentals.</p>

      <div className="theme-card rounded-2xl border p-12 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mb-4 text-2xl">
          🏎️
        </div>
        <h3 className="font-display text-lg font-bold theme-text">No Bookings Found</h3>
        <p className="text-xs theme-text-muted mt-1 max-w-sm mx-auto">
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
