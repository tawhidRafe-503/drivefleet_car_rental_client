"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function BookingModal({ open, onClose, onSuccess, car }) {
  const { user } = useAuth();
  const [driverNeeded, setDriverNeeded] = useState("no");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open || !car) return null;

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car._id || car.id,
          carName: car.carName || car.model,
          dailyPrice: car.dailyPrice || car.pricePerDay,
          driverNeeded: driverNeeded === "yes",
          specialNote: note,
          renterEmail: user?.email || "user@drivefleet.com",
          bookingDate: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Booking failed. Try again.");
      }
      toast.success("Car booked successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <form onSubmit={handleBook} className="theme-card relative w-full max-w-md rounded-3xl border p-6 shadow-2xl">
        <h3 className="font-display text-xl font-extrabold theme-text">Book {car.carName || car.model}</h3>
        <p className="mt-1 text-xs text-cyan-500 font-bold">${car.dailyPrice || car.pricePerDay} / day</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider theme-text mb-1">
              Driver Needed
            </label>
            <div className="flex gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs font-medium theme-text cursor-pointer">
                <input
                  type="radio"
                  name="driver"
                  className="h-4 w-4 border-cyan-500 text-cyan-500 focus:ring-cyan-500"
                  checked={driverNeeded === "no"}
                  onChange={() => setDriverNeeded("no")}
                />
                No (Self drive)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium theme-text cursor-pointer">
                <input
                  type="radio"
                  name="driver"
                  className="h-4 w-4 border-cyan-500 text-cyan-500 focus:ring-cyan-500"
                  checked={driverNeeded === "yes"}
                  onChange={() => setDriverNeeded("yes")}
                />
                Yes (+$25/day)
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider theme-text mb-1">
              Special Note <span className="theme-text-muted text-[10px] lowercase">(optional)</span>
            </label>
            <textarea
              className="theme-card w-full rounded-xl border p-3 text-sm focus:border-cyan-500 focus:outline-none resize-none"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything the owner should know..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2.5 pt-3 border-t theme-border">
          <button
            type="button"
            className="rounded-xl border theme-border px-4 py-2 text-xs font-semibold theme-text hover:bg-slate-500/10 cursor-pointer"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Book now"}
          </button>
        </div>
      </form>
    </div>
  );
}
