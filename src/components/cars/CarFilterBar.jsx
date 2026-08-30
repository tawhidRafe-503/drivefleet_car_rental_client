"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric"];

export default function CarFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  // Sync state with URL searchParam during render if URL changes
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearch(urlSearch);
  }

  const activeType = searchParams.get("type") || "All";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("search", search.trim());
    }
    router.push(`/cars?${params.toString()}`);
  };

  const handleCategoryClick = (type) => {
    setSearch("");
    const params = new URLSearchParams();
    if (type && type !== "All") {
      params.set("type", type);
    }
    router.push(`/cars?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearch("");
    const params = new URLSearchParams();
    if (activeType && activeType !== "All") {
      params.set("type", activeType);
    }
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-md group">
        <HiOutlineSearch
          size={18}
          className="absolute left-3.5 text-cyan-500 transition-transform duration-300 group-hover:scale-110"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by car name or model..."
          className="theme-card w-full rounded-2xl border px-4 py-2.5 pl-10 pr-20 text-sm shadow-sm transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none group-hover:border-cyan-500/50"
        />
        {search && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-12 text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1"
            aria-label="Clear search"
          >
            <HiOutlineX size={16} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 p-2 text-white shadow-md transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer"
          aria-label="Search"
          title="Click to search"
        >
          <HiOutlineSearch size={16} />
        </button>
      </form>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {carTypes.map((type) => {
          const isActive = activeType === type && !urlSearch;
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleCategoryClick(type)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none active:scale-95 ${
                isActive
                  ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border-transparent scale-105"
                  : "theme-card border theme-text-muted hover:theme-text hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:scale-105"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
