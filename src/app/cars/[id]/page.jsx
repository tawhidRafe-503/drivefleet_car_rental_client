import Link from "next/link";
import Image from "next/image";
import { mockCars } from "@/data/cars";
import { HiOutlineUserGroup, HiOutlineCog, HiOutlineLocationMarker, HiOutlineStar, HiOutlineInformationCircle } from "react-icons/hi";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const car = mockCars.find((item) => item.id === id) || {
    id,
    model: "Tesla Model S Plaid",
    category: "Electric",
    pricePerDay: 150,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    location: "Dhaka, Bangladesh",
    description: "Experience revolutionary electric performance with 1,020 horsepower, tri-motor all-wheel drive, and luxury minimalist interior for an unforgettable highway cruise.",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 theme-bg min-h-[85vh]">
      <Link
        href="/cars"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-600 transition mb-6"
      >
        ← Back to all cars
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Car Image Gallery / Hero */}
        <div className="lg:col-span-7 relative aspect-16/10 rounded-3xl overflow-hidden border theme-border theme-card shadow-2xl">
          <Image
            src={car.image}
            alt={car.model}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute top-4 left-4 rounded-full bg-slate-900/80 px-3.5 py-1 text-xs font-bold text-cyan-300 border border-white/10 backdrop-blur-md">
            {car.category}
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-500 border border-amber-500/30 backdrop-blur-md">
            <HiOutlineStar size={14} />
            <span>{car.rating}</span>
          </div>
        </div>

        {/* Details & Description Column */}
        <div className="lg:col-span-5 theme-card rounded-3xl border p-6 md:p-8 shadow-2xl space-y-6">
          <div>
            <div className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500 border border-cyan-500/20 mb-2">
              Vehicle #{car.id}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold theme-text">{car.model}</h1>
            <div className="mt-2 flex items-center gap-1.5 text-xs theme-text-muted">
              <HiOutlineLocationMarker className="text-cyan-500" size={16} />
              <span>{car.location}</span>
            </div>
          </div>

          {/* Short Description Section */}
          <div className="rounded-2xl border theme-border bg-cyan-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-500 mb-1.5">
              <HiOutlineInformationCircle size={16} />
              <span>About This Vehicle</span>
            </div>
            <p className="text-xs leading-relaxed theme-text-muted">{car.description}</p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 border-y theme-border py-4 text-xs theme-text-muted">
            <div className="flex items-center gap-2">
              <HiOutlineUserGroup className="text-cyan-500" size={18} />
              <div>
                <p className="text-[10px] uppercase font-bold theme-text-muted">Seating</p>
                <p className="font-semibold theme-text">{car.seats} Passengers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineCog className="text-cyan-500" size={18} />
              <div>
                <p className="text-[10px] uppercase font-bold theme-text-muted">Transmission</p>
                <p className="font-semibold theme-text">{car.transmission}</p>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-[10px] uppercase font-bold theme-text-muted">Daily Rental</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-extrabold text-cyan-500">${car.pricePerDay}</span>
                <span className="text-xs theme-text-muted">/ day</span>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
