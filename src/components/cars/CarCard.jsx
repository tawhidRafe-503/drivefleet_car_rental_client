import Link from "next/link";
import Image from "next/image";

export default function CarCard({ car }) {
  const {
    _id,
    id,
    carName,
    model,
    carType,
    category,
    dailyPrice,
    pricePerDay,
    imageURL,
    image,
    seatCapacity,
    seats,
    pickupLocation,
    location,
    availabilityStatus,
  } = car;

  const carId = _id || id;
  const name = carName || model || "Vehicle";
  const type = carType || category || "Sedan";
  const price = dailyPrice || pricePerDay || 100;
  const imgSrc = imageURL || image;
  const capacity = seatCapacity || seats || 5;
  const loc = pickupLocation || location || "Bangladesh";

  return (
    <div className="theme-card group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-200 dark:bg-slate-900">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🏎️</div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold text-cyan-300 border border-white/10 backdrop-blur-md">
          {type}
        </span>
        {availabilityStatus === false && (
          <span className="absolute top-3 right-3 rounded-full bg-rose-500/80 px-2.5 py-0.5 text-[11px] font-bold text-white border border-rose-500/30 backdrop-blur-md">
            Booked
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold theme-text group-hover:text-cyan-500 transition">
            {name}
          </h3>
          <p className="whitespace-nowrap text-right font-display text-base font-extrabold text-cyan-500">
            ${price}
            <span className="text-xs font-normal theme-text-muted">/day</span>
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-3 text-xs theme-text-muted">
          <span>{capacity} seats</span>
          <span>•</span>
          <span>{loc}</span>
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/cars/${carId}`}
            className="block w-full text-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 py-2 text-xs font-semibold text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
