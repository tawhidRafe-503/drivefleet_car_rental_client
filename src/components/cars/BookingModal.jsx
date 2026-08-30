"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function BookingModal({ open, onClose, onSuccess, car }) {
  const { user } = useAuth();
  const [driverNeeded, setDriverNeeded] = useState("no");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        `${API_URL}/bookings`,
        {
          carId: car._id,
          carName: car.carName,
          dailyPrice: car.dailyPrice,
          driverNeeded: driverNeeded === "yes",
          specialNote: note,
          renterEmail: user?.email || "user@drivefleet.com",
          bookingDate: new Date().toISOString(),
        },
        { withCredentials: true }
      );
      toast.success("Car booked successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
      <form onSubmit={handleBook} className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl border border-base-300">
        <h3 className="font-display text-lg font-semibold">Book {car.carName}</h3>
        <p className="mt-1 text-sm text-base-content/60">${car.dailyPrice} / day</p>

        <div className="form-control mt-5">
          <label className="label"><span className="label-text font-medium">Driver needed</span></label>
          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="driver"
                className="radio radio-primary radio-sm"
                checked={driverNeeded === "no"}
                onChange={() => setDriverNeeded("no")}
              />
              No (Self drive)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="driver"
                className="radio radio-primary radio-sm"
                checked={driverNeeded === "yes"}
                onChange={() => setDriverNeeded("yes")}
              />
              Yes (+$25/day)
            </label>
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label"><span className="label-text font-medium">Special note (optional)</span></label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything the owner should know"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "Book now"}
          </button>
        </div>
      </form>
    </div>
  );
}
