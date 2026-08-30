import { Suspense } from "react";
import CarFilterBar from "@/components/cars/CarFilterBar";
import CarCard from "@/components/cars/CarCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { mockCars } from "@/data/cars";

async function getCars(searchParams) {
  const params = new URLSearchParams();
  if (searchParams?.search) params.set("search", searchParams.search);
  if (searchParams?.type) params.set("type", searchParams.type);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API not available");
    const data = await res.json();
    return data.cars || data || [];
  } catch {
    // Fallback filtering over mockCars dataset if backend API is offline
    const search = (searchParams?.search || "").trim().toLowerCase();
    const type = (searchParams?.type || "All").trim().toLowerCase();

    return mockCars.filter((car) => {
      const model = (car.model || car.carName || "").toLowerCase();
      const location = (car.location || car.pickupLocation || "").toLowerCase();
      const category = (car.category || car.carType || "").toLowerCase();

      const matchesSearch =
        !search || model.includes(search) || location.includes(search) || category.includes(search);

      const matchesType = type === "all" || category === type || category.includes(type);

      return matchesSearch && matchesType;
    });
  }
}

export default async function ExploreCarsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const cars = await getCars(resolvedParams);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 theme-bg min-h-[85vh] md:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold theme-text sm:text-4xl">Explore Available Cars</h1>
        <p className="mt-2 text-sm theme-text-muted">
          Browse our complete vehicle fleet across all categories and locations.
        </p>
      </div>

      <div className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <CarFilterBar />
        </Suspense>
      </div>

      {cars.length === 0 ? (
        <div className="theme-card rounded-3xl border p-12 text-center shadow-xl mt-8">
          <p className="theme-text-muted text-sm">
            No cars match your search. Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id || car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
