"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import BookingModal from "@/components/cars/BookingModal";

export default function CarDetailsClient({ car }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(car?.bookingCount ?? 0);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please log in to book a car");
      router.push(`/login?redirectTo=/cars/${car._id}`);
      return;
    }
    setOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-base-300 p-4">
          <p className="text-base-content/50">Seats</p>
          <p className="font-semibold">{car.seatCapacity}</p>
        </div>
        <div className="rounded-xl border border-base-300 p-4">
          <p className="text-base-content/50">Pickup location</p>
          <p className="font-semibold">{car.pickupLocation}</p>
        </div>
        <div className="rounded-xl border border-base-300 p-4">
          <p className="text-base-content/50">Availability</p>
          <p className="font-semibold">
            {car.availabilityStatus === false ? "Unavailable" : "Available"}
          </p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-base-content/50">Booking count</p>
          <p className="font-display text-lg font-bold text-primary">{bookingCount}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-1 text-sm font-semibold">Description</p>
        <p className="text-sm text-base-content/70">{car.description}</p>
      </div>

      <button
        onClick={handleBookNow}
        disabled={car.availabilityStatus === false}
        className="btn btn-primary mt-6 w-full rounded-full disabled:btn-disabled"
      >
        {car.availabilityStatus === false ? "Currently unavailable" : "Book now"}
      </button>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleBookingSuccess}
        car={car}
      />
    </>
  );
}
