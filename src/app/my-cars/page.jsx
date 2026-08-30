"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/layout/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function MyCarsGrid() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_URL}/cars/my-cars`, { withCredentials: true })
      .then((res) => {
        if (active) setCars(res.data.cars || res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch my cars:", err);
        if (active) setCars([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/cars/${target._id}`, { withCredentials: true });
      setCars((prev) => prev.filter((c) => c._id !== target._id));
      toast.success("Car listing deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete this car. Try again.");
    } finally {
      setDeleting(false);
      setTarget(null);
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">My added cars</h1>
          <p className="mt-1 text-base-content/60">Manage the vehicles you&apos;ve listed.</p>
        </div>
        <Link href="/add-car" className="btn btn-primary rounded-full">
          Add another car
        </Link>
      </div>

      {cars.length === 0 ? (
        <p className="mt-16 text-center text-base-content/60">
          You haven&apos;t listed any cars yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div key={car._id} className="overflow-hidden rounded-2xl border border-base-300">
              <div className="relative h-36 w-full bg-base-200">
                {car.imageURL ? (
                  <Image src={car.imageURL} alt={car.carName} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">🚗</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-display font-semibold">{car.carName}</p>
                <p className="mt-1 text-sm text-base-content/60">
                  ${car.dailyPrice}/day · {car.carType}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/my-cars/update/${car._id}`} className="btn btn-outline btn-sm flex-1 rounded-full">
                    Update
                  </Link>
                  <button onClick={() => setTarget(car)} className="btn btn-error btn-sm flex-1 rounded-full text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        open={!!target}
        title={target?.carName}
        loading={deleting}
        onCancel={() => setTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default function MyCarsPage() {
  return (
    <PrivateRoute>
      <MyCarsGrid />
    </PrivateRoute>
  );
}
