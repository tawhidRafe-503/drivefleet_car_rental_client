import { Suspense } from "react";
import CarFilterBar from "@/components/cars/CarFilterBar";
import CarCard from "@/components/cars/CarCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

async function getCars(searchParams) {
  const params = new URLSearchParams();
  if (searchParams?.search) params.set("search", searchParams.search);
  if (searchParams?.type) params.set("type", searchParams.type);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.cars || data || [];
  } catch {
    return [];
  }
}

export default async function ExploreCarsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const cars = await getCars(resolvedParams);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="font-display text-3xl font-extrabold">Explore cars</h1>
      <p className="mt-1 text-base-content/60">Browse every listing, available or not.</p>

      <div className="mt-8">
        <Suspense fallback={<LoadingSpinner />}>
          <CarFilterBar />
        </Suspense>
      </div>

      {cars.length === 0 ? (
        <p className="mt-16 text-center text-base-content/60">
          No cars match your search. Try a different name or type.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
