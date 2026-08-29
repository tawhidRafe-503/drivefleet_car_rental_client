"use client";

import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";

export default function MyCarsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 theme-bg min-h-[85vh]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold theme-text">My Added Cars</h1>
          <p className="theme-text-muted text-sm mt-1">Manage vehicles you have listed for rent.</p>
        </div>
        <Link
          href="/add-car"
          className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
        >
          <HiOutlinePlus size={16} />
          <span>Add New Car</span>
        </Link>
      </div>

      <div className="theme-card rounded-3xl border p-12 text-center shadow-xl">
        <h3 className="font-display text-lg font-bold theme-text">No Cars Listed Yet</h3>
        <p className="text-xs theme-text-muted mt-1 max-w-sm mx-auto mb-6">
          Start earning by listing your car on DriveFleet.
        </p>
        <Link
          href="/add-car"
          className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
        >
          <HiOutlinePlus size={16} />
          <span>Go to Add Car</span>
        </Link>
      </div>
    </div>
  );
}