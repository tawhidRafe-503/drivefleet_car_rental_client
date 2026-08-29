"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCarPage() {
  const [formData, setFormData] = useState({
    model: "",
    category: "Sedan",
    pricePerDay: "",
    location: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Car added successfully!");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-white mb-2">Add a New Car</h1>
      <p className="text-slate-400 text-sm mb-8">List your car on DriveFleet and start earning from rentals.</p>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-[#071427] p-6 shadow-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Car Model / Title</label>
          <input
            type="text"
            required
            placeholder="e.g. 2024 Honda Civic Turbo"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#071427] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Daily Price ($ USD)</label>
            <input
              type="number"
              required
              placeholder="e.g. 85"
              value={formData.pricePerDay}
              onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Location</label>
          <input
            type="text"
            required
            placeholder="e.g. Dhaka, Gulshan"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Image URL</label>
          <input
            type="url"
            placeholder="https://..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
}
