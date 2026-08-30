"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import BookingModal from "@/components/cars/BookingModal";
import { HiOutlineUserGroup, HiOutlineLocationMarker, HiOutlineCheckCircle, HiOutlineClock, HiOutlineInformationCircle } from "react-icons/hi";

export default function CarDetailsClient({ car }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(car?.bookingCount ?? 0);

  const carId = car?._id || car?.id || "1";
  const seats = car?.seatCapacity || car?.seats || 5;
  const location = car?.pickupLocation || car?.location || "Dhaka, Bangladesh";
  const description = car?.description || "Experience top-tier performance, luxury interior, and smooth driving dynamics with DriveFleet.";
  const isAvailable = car?.availabilityStatus !== false;

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please log in to book a car");
      router.push(`/login?redirectTo=${encodeURIComponent(`/cars/${carId}`)}`);
      return;
    }
    setOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-between flex-1 space-y-5 pt-4">
      {/* Short Description Block */}
      <div className="theme-card rounded-2xl border p-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-500 mb-1.5">
          <HiOutlineInformationCircle size={16} />
          <span>Vehicle Overview</span>
        </div>
        <p className="text-xs leading-relaxed theme-text-muted">{description}</p>
      </div>

      {/* Specs Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="theme-card rounded-2xl border p-3.5 shadow-xs">
          <div className="flex items-center gap-2 theme-text-muted mb-1">
            <HiOutlineUserGroup className="text-cyan-500" size={16} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Capacity</span>
          </div>
          <p className="font-bold theme-text text-xs sm:text-sm">{seats} Passengers</p>
        </div>

        <div className="theme-card rounded-2xl border p-3.5 shadow-xs">
          <div className="flex items-center gap-2 theme-text-muted mb-1">
            <HiOutlineLocationMarker className="text-cyan-500" size={16} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Location</span>
          </div>
          <p className="font-bold theme-text text-xs sm:text-sm truncate">{location}</p>
        </div>

        <div className="theme-card rounded-2xl border p-3.5 shadow-xs">
          <div className="flex items-center gap-2 theme-text-muted mb-1">
            <HiOutlineCheckCircle className="text-emerald-500" size={16} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Status</span>
          </div>
          <p className={`font-bold text-xs sm:text-sm ${isAvailable ? "text-emerald-500" : "text-rose-500"}`}>
            {isAvailable ? "Available Now" : "Booked"}
          </p>
        </div>

        <div className="theme-card rounded-2xl border p-3.5 shadow-xs">
          <div className="flex items-center gap-2 theme-text-muted mb-1">
            <HiOutlineClock className="text-cyan-500" size={16} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Activity</span>
          </div>
          <p className="font-display font-bold text-cyan-500 text-xs sm:text-sm">{bookingCount} Bookings</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleBookNow}
        disabled={!isAvailable}
        className="w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {!isAvailable ? "Currently Unavailable" : "Book Now"}
      </button>

      {/* Booking Modal */}
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleBookingSuccess}
        car={car}
      />
    </div>
  );
}
