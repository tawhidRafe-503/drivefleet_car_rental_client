import Link from "next/link";
import CarCard from "../cars/CarCard";
import { mockCars } from "@/data/cars";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getFeaturedCars() {
  try {
    const res = await fetch(`${API_URL}/cars?featured=true&limit=6`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const list = data.cars || data || [];
      if (Array.isArray(list) && list.length > 0) {
        // Exclude user-added cars from home page featured list
        return list.filter((car) => !car.isUserAdded).slice(0, 6);
      }
    }
  } catch {
    // API connection offline or pending
  }
  return mockCars.slice(0, 6);
}

export default async function AvailableCars() {
  const cars = await getFeaturedCars();

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
          {cars.map((car) => (
            <CarCard key={car._id || car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
