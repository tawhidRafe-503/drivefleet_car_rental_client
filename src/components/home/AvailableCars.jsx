import Link from "next/link";
import CarCard from "../cars/CarCard";

async function getFeaturedCars() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.cars || data || [];
  } catch {
    return [];
  }
}

export default async function AvailableCars() {
  const cars = await getFeaturedCars();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Available now
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold">
            Cars ready for your next trip
          </h2>
        </div>
        <Link href="/cars" className="btn btn-outline rounded-full">
          View all cars
        </Link>
      </div>

      {cars.length === 0 ? (
        <p className="text-center text-base-content/60">
          No cars available right now — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.slice(0, 6).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
