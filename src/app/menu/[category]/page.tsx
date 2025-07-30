"use client";

import { mockMenuData } from "@/lib/data/menuData";
import FoodCard from "@/components/FoodCard";
import { notFound } from "next/navigation";
import { useState } from "react";

interface Props {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const [search, setSearch] = useState("");

  // Get all items for that category
  const filteredByCategory = mockMenuData.filter(
    (item) => item.category?.toLowerCase() === category.toLowerCase()
  );

  if (!filteredByCategory.length) return notFound();

  // Further filter by search term
  const finalFilteredItems = filteredByCategory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-white dark:bg-background py-4 px-4 sm:px-6 lg:px-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold capitalize">
          {category} Foods
        </h1>
        <input
          type="text"
          placeholder="Search Food..."
          className="w-full md:w-[300px] px-3 py-2 border rounded-md text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scrollable Grid Section */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 ">
        {finalFilteredItems.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
            {finalFilteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No items match your search.
          </div>
        )}
      </main>
    </div>
  );
}
