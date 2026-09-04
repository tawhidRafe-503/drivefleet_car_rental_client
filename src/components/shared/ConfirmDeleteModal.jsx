"use client";

import { HiOutlineTrash, HiOutlineExclamation, HiOutlineX } from "react-icons/hi";

const ConfirmDeleteModal = ({ open, title, onCancel, onConfirm, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-all duration-300">
      {/* Modal Card */}
      <div className="theme-card relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95">
        {/* Top Accent Indicator */}
        <div className="h-1.5 w-full bg-linear-to-r from-red-500 via-rose-500 to-amber-500" />

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
          {/* Hero Warning Icon Badge */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-8 ring-red-500/5 mb-4">
            <HiOutlineExclamation size={28} />
          </div>

          {/* Modal Header */}
          <h3 className="font-display text-xl font-extrabold theme-text">
            Delete Vehicle Listing?
          </h3>
          <p className="mt-2 text-xs theme-text-muted leading-relaxed px-2">
            Are you sure you want to permanently delete{" "}
            <span className="font-bold theme-text text-red-400">
              {title ? `"${title}"` : "this car listing"}
            </span>
            ? This action cannot be undone.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex items-center justify-end gap-3 pt-4 border-t theme-border">
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
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-red-500 to-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <HiOutlineTrash size={16} />
              <span>{loading ? "Deleting..." : "Confirm Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;