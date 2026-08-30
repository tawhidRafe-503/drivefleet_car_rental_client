"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/layout/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { HiOutlineCalendar, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineExclamationCircle } from "react-icons/hi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function UpdateBookingModal({ open, booking, onClose, onSuccess }) {
  const [bookingDate, setBookingDate] = useState(() =>
    booking?.bookingDate ? new Date(booking.bookingDate).toISOString().slice(0, 10) : ""
  );
  const [driverNeeded, setDriverNeeded] = useState(() => !!booking?.driverNeeded);
  const [specialNote, setSpecialNote] = useState(() => booking?.specialNote || "");
  const [updating, setUpdating] = useState(false);

  if (!open || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`${API_URL}/bookings/${booking._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingDate: new Date(bookingDate).toISOString(),
          driverNeeded,
          specialNote,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not update booking. Try again.");
      }
      toast.success("Booking updated successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Could not update booking. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="theme-card relative w-full max-w-md rounded-3xl border p-6 shadow-2xl">
        <h3 className="font-display text-xl font-extrabold theme-text">
          Update Booking for {booking.carName || "Vehicle"}
        </h3>
        <p className="text-xs theme-text-muted mt-1">Modify your booking dates or preferences</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider theme-text mb-1">
              Booking Date
            </label>
            <input
              type="date"
              required
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="theme-card w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={driverNeeded}
              onChange={(e) => setDriverNeeded(e.target.checked)}
              className="h-4 w-4 rounded border-cyan-500 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-xs font-medium theme-text">Driver needed (+$25/day)</span>
          </label>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider theme-text mb-1">
              Special Note
            </label>
            <textarea
              rows={3}
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="theme-card w-full rounded-xl border p-3 text-sm focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Update your notes for the owner..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t theme-border mt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border theme-border px-4 py-2 text-xs font-semibold theme-text hover:bg-slate-500/10 cursor-pointer"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CancelBookingModal({ open, booking, onClose, onSuccess }) {
  const [canceling, setCanceling] = useState(false);

  if (!open || !booking) return null;

  const handleCancel = async () => {
    setCanceling(true);
    try {
      const res = await fetch(`${API_URL}/bookings/${booking._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not cancel booking. Try again.");
      }
      toast.success("Booking canceled successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Could not cancel booking. Try again.");
    } finally {
      setCanceling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="theme-card relative w-full max-w-sm rounded-3xl border p-6 shadow-2xl">
        <div className="flex items-center gap-2 text-rose-500 mb-2">
          <HiOutlineExclamationCircle size={22} />
          <h3 className="font-display text-lg font-bold">Cancel Booking</h3>
        </div>
        <p className="text-xs theme-text-muted leading-relaxed">
          Are you sure you want to cancel your booking for <strong>{booking.carName}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2.5 pt-4 border-t theme-border mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border theme-border px-4 py-2 text-xs font-semibold theme-text hover:bg-slate-500/10 cursor-pointer"
            disabled={canceling}
          >
            Keep Booking
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-rose-600 disabled:opacity-50 cursor-pointer"
            disabled={canceling}
          >
            {canceling ? "Canceling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MyBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [cancelingBooking, setCancelingBooking] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch(`${API_URL}/bookings/my-bookings`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (!ignore) {
            setBookings(data.bookings || data || []);
          }
        } else if (!ignore) {
          setBookings([]);
        }
      } catch (err) {
        console.error("Failed to fetch my bookings:", err);
        if (!ignore) {
          setBookings([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  const refreshBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/my-bookings`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || data || []);
      }
    } catch (err) {
      console.error("Failed to refresh bookings:", err);
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 theme-bg min-h-[85vh] md:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold theme-text">My Bookings</h1>
        <p className="mt-1 text-sm theme-text-muted">Cars you&apos;ve reserved across DriveFleet.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="theme-card rounded-3xl border p-12 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mb-4">
            <HiOutlineCalendar size={28} />
          </div>
          <h3 className="font-display text-lg font-bold theme-text">No Bookings Found</h3>
          <p className="text-xs theme-text-muted mt-1 max-w-sm mx-auto mb-6">
            You haven&apos;t booked any cars yet. Explore our fleet and reserve your next vehicle today!
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            Browse Available Cars
          </Link>
        </div>
      ) : (
        <div className="theme-card overflow-hidden rounded-2xl border shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b theme-border bg-cyan-500/5 text-xs uppercase font-semibold theme-text-muted">
                <tr>
                  <th className="px-5 py-3.5">Car</th>
                  <th className="px-5 py-3.5">Price</th>
                  <th className="px-5 py-3.5">Driver</th>
                  <th className="px-5 py-3.5">Note</th>
                  <th className="px-5 py-3.5">Booking Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y theme-border">
                {bookings.map((b) => (
                  <tr key={b._id} className="transition hover:bg-cyan-500/5">
                    <td className="px-5 py-4 font-semibold theme-text">{b.carName}</td>
                    <td className="px-5 py-4 font-bold text-cyan-500">${b.dailyPrice}/day</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                          b.driverNeeded
                            ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
                            : "bg-slate-500/10 theme-text-muted border-slate-500/20"
                        }`}
                      >
                        {b.driverNeeded ? "Driver Included" : "Self Drive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate text-xs theme-text-muted">
                      {b.specialNote || "—"}
                    </td>
                    <td className="px-5 py-4 text-xs theme-text-muted">
                      {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBooking(b)}
                          className="inline-flex items-center gap-1 rounded-lg border theme-border px-3 py-1 text-xs font-semibold theme-text hover:border-cyan-500 hover:text-cyan-500 transition cursor-pointer"
                        >
                          <HiOutlinePencilAlt size={14} />
                          <span>Update</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCancelingBooking(b)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        >
                          <HiOutlineTrash size={14} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <UpdateBookingModal
        key={editingBooking?._id || "none"}
        open={!!editingBooking}
        booking={editingBooking}
        onClose={() => setEditingBooking(null)}
        onSuccess={refreshBookings}
      />

      <CancelBookingModal
        open={!!cancelingBooking}
        booking={cancelingBooking}
        onClose={() => setCancelingBooking(null)}
        onSuccess={refreshBookings}
      />
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsTable />
    </PrivateRoute>
  );
}
