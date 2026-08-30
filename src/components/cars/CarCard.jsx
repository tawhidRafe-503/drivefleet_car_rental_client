import Link from "next/link";
import Image from "next/image";

export default function CarCard({ car }) {
  const {
    _id,
    carName,
    carType,
    dailyPrice,
    imageURL,
    seatCapacity,
    pickupLocation,
    availabilityStatus,
  } = car;

  return (
    <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-40 w-full bg-base-200">
        {imageURL ? (
          <Image src={imageURL} alt={carName} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🚗</div>
        )}
        <span className="badge badge-neutral absolute left-3 top-3 border-none bg-black/60 text-white">
          {carType}
        </span>
        {availabilityStatus === false && (
          <span className="badge badge-error absolute right-3 top-3 border-none text-white">
            Unavailable
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold">{carName}</h3>
          <p className="whitespace-nowrap text-right font-bold text-secondary">
            ${dailyPrice}
            <span className="text-xs font-normal text-base-content/50">/day</span>
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-base-content/60">
          <span>{seatCapacity} seats</span>
          <span>{pickupLocation}</span>
        </div>
        <Link href={`/cars/${_id}`} className="btn btn-outline btn-sm mt-4 w-full rounded-full">
          View details
        </Link>
      </div>
    </div>
  );
}
