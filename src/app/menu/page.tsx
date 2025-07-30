"use client";

import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import FoodGrid from "@/components/FoodGrid";
import { FiltersType } from "@/types/types";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FiltersType>({
    vegOnly: false,
    rating4Plus: false,
    fastDelivery: false,
    sortBy: "",
  });

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden px-4 sm:px-6 lg:px-8 ">
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-6 lg:px-8 relative my-4">
        <div className="sticky top-0 z-10 bg-white dark:bg-background py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
          <h1 className="text-xl sm:text-2xl font-semibold">
            In Bhopal? Your Food’s Just 10 Minutes Away!
          </h1>
          <input
            type="text"
            placeholder="Search Food..."
            className="w-full md:w-[300px] px-3 py-2 border rounded-md text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FoodGrid search={search} filters={filters} />
      </main>
    </div>
  );
}
