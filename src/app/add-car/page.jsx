"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi";
import { useAuth } from "@/providers/AuthProvider";
import { getBetterAuthHeaders } from "@/lib/getBetterAuthToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AddCarPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    model: "",
    category: "Sedan",
    pricePerDay: "",
    location: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      carName: formData.model.trim(),
      model: formData.model.trim(),
      category: formData.category,
      dailyPrice: Number(formData.pricePerDay),
      pricePerDay: Number(formData.pricePerDay),
      location: formData.location.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      userEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const headers = await getBetterAuthHeaders();
      const res = await fetch(`${API_URL}/cars`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to add car to backend");
      }

      toast.success(`"${formData.model}" added successfully!`);
      setFormData({
        model: "",
        category: "Sedan",
        pricePerDay: "",
        location: "",
        description: "",
        image: "",
      });
      router.push("/cars");
    } catch (err) {
      toast.error(err?.message || "Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 theme-bg min-h-[85vh]">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-500 mb-3">
          <HiOutlineSparkles size={14} />
          Vehicle Listing
        </div>
        <h1 className="font-display text-3xl font-extrabold theme-text sm:text-4xl">
          Add a New Vehicle
        </h1>
        <p className="theme-text-muted text-sm mt-2">
          Fill in the details below to list your car on DriveFleet for rental bookings.
        </p>
      </div>

      {/* Embedded Form Card */}
      <div className="theme-card rounded-3xl border p-6 md:p-10 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
              Car Model / Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2024 Porsche Taycan GTS"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
                Daily Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="10"
                placeholder="e.g. 150"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dhaka, Gulshan"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide a brief summary highlighting vehicle performance, features, and comfort..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold theme-text uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="theme-card w-full rounded-xl border px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
            >
              <HiOutlinePlus size={18} />
              <span>{loading ? "Adding Vehicle..." : "Add Vehicle"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
