"use client";

import { useState } from "react";
import { MenuCard } from "./MenuCard";
import { mockMenuItems } from "@/lib/data/mockMenuItems";
import { CategoryFilter } from "./CategoryFilter";
import { MenuActions } from "./MenuActions";
import { AddDishModal } from "./AddDishModal";
import { MenuItem } from "@/types/types";
import { toast } from "sonner"; 

export function MenuList() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  let filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  filteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  filteredItems = filteredItems.sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Search, Sort, Add */}
      <MenuActions
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      {/* Add Dish Modal */}
      <AddDishModal
        open={isAddModalOpen}
        setOpen={setIsAddModalOpen}
        onAdd={(newDish) => {
          setItems((prev) => [newDish, ...prev]);
          toast.success("New dish added successfully!");
        }}
      />

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onDelete={(id) => {
              setItems((prev) => prev.filter((dish) => dish.id !== id));
            }}
            onEdit={(updated) => {
              setItems((prev) =>
                prev.map((dish) => (dish.id === updated.id ? updated : dish))
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
