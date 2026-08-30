import { notFound } from "next/navigation";
import Image from "next/image";
import CarDetailsClient from "./CarDetailsClient";

async function getCar(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-base-200 md:h-full">
          {car.imageURL ? (
            <Image src={car.imageURL} alt={car.carName} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">🚗</div>
          )}
        </div>

        <div>
          <span className="badge badge-outline">{car.carType}</span>
          <h1 className="font-display mt-3 text-3xl font-extrabold">{car.carName}</h1>
          <p className="mt-2 text-2xl font-bold text-secondary">
            ${car.dailyPrice}
            <span className="text-sm font-normal text-base-content/50"> / day</span>
          </p>

          <CarDetailsClient car={car} />
        </div>
      </div>
    </div>
  );
}
