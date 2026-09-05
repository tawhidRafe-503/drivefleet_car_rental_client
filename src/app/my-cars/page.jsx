"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/layout/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import { useAuth } from "@/providers/AuthProvider";
import { getBetterAuthHeaders } from "@/lib/getBetterAuthToken";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSparkles, HiOutlineTruck } from "react-icons/hi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function MyCarsGrid() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadMyCars() {
      const email = user?.email || "";
      const fetchUrl = email
        ? `${API_URL}/cars/my-cars?email=${encodeURIComponent(email)}`
        : `${API_URL}/cars/my-cars`;

      try {
        const headers = await getBetterAuthHeaders();
        const res = await fetch(fetchUrl, {
          signal: controller.signal,
          headers,
        });

        if (res.ok) {
          const data = await res.json().catch(() => []);
          const list = data?.cars || data || [];
          if (active) setCars(Array.isArray(list) ? list : []);
        } else if (active) {
          setCars([]);
        }
      } catch (err) {
        if (err.name !== "AbortError" && active) {
          setCars([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMyCars();

    return () => {
      active = false;
      controller.abort();
    };
  }, [user]);

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      const headers = await getBetterAuthHeaders();
      const res = await fetch(`${API_URL}/cars/${target._id || target.id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Couldn't delete this car.");
      }
      setCars((prev) => prev.filter((c) => (c._id || c.id) !== (target._id || target.id)));
      toast.success("Car listing deleted successfully");
    } catch (err) {
      toast.error(err?.message || "Couldn't delete this car. Try again.");
    } finally {
      setDeleting(false);
      setTarget(null);
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 theme-bg min-h-[85vh] md:px-8">
      {/* Page Header with Action Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold text-cyan-500 mb-2">
            <HiOutlineSparkles size={14} />
            Vehicle Fleet Management
          </div>
          <h1 className="font-display text-3xl font-extrabold theme-text sm:text-4xl">My Added Cars</h1>
          <p className="mt-1 text-sm theme-text-muted">
            Manage, update, or expand your vehicle listings available for bookings.
          </p>
        </div>

        {/* Designed "Add another car" Button */}
        <Link
          href="/add-car"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer self-start sm:self-auto"
        >
          <HiOutlinePlus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
          <span>Add Another Car</span>
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="theme-card rounded-3xl border p-12 text-center shadow-xl mt-8 max-w-xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 mb-4">
            <HiOutlineTruck size={32} />
          </div>
          <h3 className="font-display text-xl font-bold theme-text mb-2">No Vehicles Listed Yet</h3>
          <p className="theme-text-muted text-sm mb-6">
            You haven&apos;t listed any cars yet. Start earning by adding your vehicle to DriveFleet today!
          </p>
          <Link
            href="/add-car"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <HiOutlinePlus size={18} />
            <span>Add Your First Car</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div key={car._id || car.id} className="theme-card overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
              <div className="relative h-44 w-full bg-slate-800/20">
                {car.imageURL || car.image ? (
                  <Image src={car.imageURL || car.image} alt={car.carName || car.model || "Vehicle"} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">🚗</div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-bold theme-text text-base truncate">{car.carName || car.model}</p>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-500 border border-cyan-500/20">
                    {car.carType || car.category || "Sedan"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-cyan-500">
                  ${car.dailyPrice || car.pricePerDay} <span className="text-xs theme-text-muted font-normal">/ day</span>
                </p>
                <div className="mt-5 flex gap-2.5 pt-3 border-t theme-border">
                  <Link
                    href={`/my-cars/update/${car._id || car.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border theme-border px-3 py-2 text-xs font-semibold theme-text hover:bg-slate-500/10 hover:border-cyan-500/40 transition cursor-pointer"
                  >
                    <HiOutlinePencil size={14} />
                    <span>Update</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTarget(car)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-2 text-xs font-semibold hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <HiOutlineTrash size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        open={!!target}
        title={target?.carName || target?.model}
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
