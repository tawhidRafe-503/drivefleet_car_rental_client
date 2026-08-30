"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric"];

export default function CarFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const activeType = searchParams.get("type") || "All";

  const applyParams = (next) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "All") params.delete(key);
      else params.set(key, value);
    });
    router.push(`/cars?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyParams({ search });
  };

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <form onSubmit={handleSearchSubmit} className="join w-full max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by car name"
          className="input join-item input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary join-item" aria-label="Search">
          <HiOutlineSearch size={18} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {carTypes.map((type) => (
          <button
            key={type}
            onClick={() => applyParams({ type })}
            className={`btn btn-sm rounded-full ${
              activeType === type ? "btn-neutral" : "btn-outline"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
