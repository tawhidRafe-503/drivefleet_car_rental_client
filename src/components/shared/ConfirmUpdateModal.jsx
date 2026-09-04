"use client";

import { HiOutlineRefresh, HiOutlineX, HiOutlineCheckCircle } from "react-icons/hi";

export default function ConfirmUpdateModal({ open, carName, formDetails, onCancel, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-all duration-300">
      {/* Modal Card */}
      <div className="theme-card relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95">
        {/* Top Accent Indicator */}
        <div className="h-1.5 w-full bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-5 rounded-full p-1 text-slate-400 hover:text-white transition cursor-pointer"
          aria-label="Close modal"
        >
          <HiOutlineX size={18} />
        </button>

        <div className="p-6 md:p-8 text-center">
          {/* Hero Icon Badge */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 ring-8 ring-cyan-500/5 mb-4">
            <HiOutlineRefresh size={28} className={loading ? "animate-spin" : ""} />
          </div>

          {/* Modal Header */}
          <h3 className="font-display text-xl font-extrabold theme-text">
            Confirm Vehicle Update?
          </h3>
          <p className="mt-1.5 text-xs theme-text-muted leading-relaxed px-2">
            Are you sure you want to save the new information for{" "}
            <span className="font-bold text-cyan-500">
              {carName ? `"${carName}"` : "this vehicle"}
            </span>
            ?
          </p>

          {/* Summary Box */}
          {formDetails && (
            <div className="mt-4 rounded-2xl border theme-border bg-slate-500/5 p-4 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="theme-text-muted">Daily Price:</span>
                <span className="font-bold text-cyan-500">${formDetails.dailyPrice} / day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="theme-text-muted">Category / Type:</span>
                <span className="font-semibold theme-text">{formDetails.carType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="theme-text-muted">Pickup Location:</span>
                <span className="font-semibold theme-text truncate max-w-[180px]">{formDetails.pickupLocation}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t theme-border">
                <span className="theme-text-muted">Booking Status:</span>
                <span className={`font-semibold ${formDetails.availabilityStatus ? "text-emerald-500" : "text-amber-500"}`}>
                  {formDetails.availabilityStatus ? "Available for booking" : "Unavailable"}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t theme-border">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl border theme-border px-5 py-2.5 text-xs font-semibold theme-text hover:bg-slate-500/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <HiOutlineCheckCircle size={16} />
              <span>{loading ? "Saving..." : "Confirm & Save"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
