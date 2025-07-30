"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiltersType } from "@/types/types";

export default function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: (val: FiltersType) => void;
}) {
  const [open, setOpen] = useState(false);

  function updateFilter(field: keyof FiltersType, value: any) {
    setFilters({ ...filters, [field]: value });
  }

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Filters</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] sm:w-[300px]">
            <SheetHeader className="text-lg font-semibold mb-2">
              Filters
            </SheetHeader>
            <FilterOptions filters={filters} updateFilter={updateFilter} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filter sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] p-4 border-r h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <FilterOptions filters={filters} updateFilter={updateFilter} />
      </aside>
    </>
  );
}

function FilterOptions({
  filters,
  updateFilter,
}: {
  filters: FiltersType;
  updateFilter: (field: keyof FiltersType, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-1">Sort By</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <input
              type="radio"
              name="sort"
              onChange={() => updateFilter("sortBy", "deliveryTime")}
              checked={filters.sortBy === "deliveryTime"}
            />{" "}
            Delivery Time
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              onChange={() => updateFilter("sortBy", "rating")}
              checked={filters.sortBy === "rating"}
            />{" "}
            Rating
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              onChange={() => updateFilter("sortBy", "costLow")}
              checked={filters.sortBy === "costLow"}
            />{" "}
            Cost: Low to High
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              onChange={() => updateFilter("sortBy", "costHigh")}
              checked={filters.sortBy === "costHigh"}
            />{" "}
            Cost: High to Low
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium mb-1">Filters</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <input
              type="checkbox"
              checked={filters.fastDelivery}
              onChange={() =>
                updateFilter("fastDelivery", !filters.fastDelivery)
              }
            />{" "}
            Fast Delivery
          </li>
          <li>
            <input
              type="checkbox"
              checked={filters.rating4Plus}
              onChange={() => updateFilter("rating4Plus", !filters.rating4Plus)}
            />{" "}
            Rating 4.0+
          </li>
          <li>
            <input
              type="checkbox"
              checked={filters.vegOnly}
              onChange={() => updateFilter("vegOnly", !filters.vegOnly)}
            />{" "}
            Pure Veg
          </li>
        </ul>
      </div>
    </div>
  );
}
