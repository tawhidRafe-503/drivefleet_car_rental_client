"use client";

import Link from "next/link";
import Image from "next/image";
import { HiOutlineUserGroup, HiOutlineCog, HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi";

const mockFeaturedCars = [
  {
    id: "1",
    model: "Tesla Model S Plaid",
    category: "Electric",
    pricePerDay: 150,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    location: "Dhaka",
  },
  {
    id: "2",
    model: "BMW M4 Competition",
    category: "Sports",
    pricePerDay: 180,
    seats: 4,
    transmission: "Automatic",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    location: "Chattogram",
  },
  {
    id: "3",
    model: "Range Rover Autobiography",
    category: "Luxury SUV",
    pricePerDay: 220,
    seats: 7,
    transmission: "Automatic",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    location: "Sylhet",
  },
  {
    id: "4",
    model: "Mercedes-Benz C-Class",
    category: "Sedan",
    pricePerDay: 130,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    location: "Cumilla",
  },
];

export default function AvailableCars() {
  return (
    <section className="py-20 theme-bg">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500 mb-3">
              <HiOutlineSparkles size={14} />
              Featured Selection
            </div>
            <h2 className="font-display text-3xl font-bold theme-text sm:text-4xl">
              Explore Our Top Rented Vehicles
            </h2>
            <p className="mt-2 theme-text-muted text-sm max-w-xl">
              Handpicked, thoroughly inspected cars ready for your next adventure or business trip.
            </p>
          </div>

          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-600 transition"
          >
            <span>View All Fleet</span>
            <HiOutlineArrowRight size={16} />
          </Link>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockFeaturedCars.map((car) => (
            <div
              key={car.id}
              className="theme-card group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-200 dark:bg-slate-900">
                <Image
                  src={car.image}
                  alt={car.model}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold text-cyan-300 border border-white/10 backdrop-blur-md">
                  {car.category}
                </div>
                <div className="absolute top-3 right-3 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-500 border border-amber-500/30 backdrop-blur-md">
                  ★ {car.rating}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold theme-text group-hover:text-cyan-500 transition">
                  {car.model}
                </h3>
                <p className="text-xs theme-text-muted mt-1">Location: {car.location}</p>

                {/* Specs */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-y theme-border py-3 text-xs theme-text-muted">
                  <div className="flex items-center gap-1.5">
                    <HiOutlineUserGroup className="text-cyan-500" size={16} />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineCog className="text-cyan-500" size={16} />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                {/* Footer / Price */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-extrabold theme-text">${car.pricePerDay}</span>
                    <span className="text-xs theme-text-muted"> / day</span>
                  </div>

                  <Link
                    href={`/cars/${car.id}`}
                    className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
