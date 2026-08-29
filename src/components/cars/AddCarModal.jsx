"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineX } from "react-icons/hi";

export default function AddCarModal({ isOpen, onClose, onCarAdded }) {
  const [formData, setFormData] = useState({
    model: "",
    category: "Sedan",
    pricePerDay: "",
    location: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(`"${formData.model || "Vehicle"}" added successfully!`);
      if (onCarAdded) onCarAdded(formData);
      setFormData({
        model: "",
        category: "Sedan",
        pricePerDay: "",
        location: "",
        description: "",
        image: "",
      });
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="theme-card relative w-full max-w-xl rounded-3xl border p-6 md:p-8 shadow-2xl transition-all duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b theme-border pb-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-extrabold theme-text">Add New Vehicle</h2>
            <p className="text-xs theme-text-muted mt-1">List your car on DriveFleet for rental bookings</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="theme-card flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer"
            aria-label="Close Modal"
          >
            <HiOutlineX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              rows={3}
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

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t theme-border pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border theme-border px-5 py-2.5 text-xs font-semibold theme-text transition hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
            >
              <HiOutlinePlus size={16} />
              <span>{loading ? "Adding..." : "Add Vehicle"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
