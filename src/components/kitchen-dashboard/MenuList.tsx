"use client";

import { useEffect, useState } from "react";
import { MenuCard } from "./MenuCard";
import { CategoryFilter } from "./CategoryFilter";
import { MenuActions } from "./MenuActions";
import { AddDishModal } from "./AddDishModal";
import { MenuItem } from "@/types/types";
import { toast } from "sonner";
import { callRpc } from "@/lib/jsonRpcClient";

export function MenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Fetch data from DB on mount
  useEffect(() => {
    async function fetchMenu() {
      try {
        const result = await callRpc("menu.list");
        setItems(result);
      } catch (err: any) {
        toast.error("Failed to load menu");
        console.error(err);
      }
    }

    fetchMenu();
  }, []);

  // ✅ Apply filters & sorting
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
      {/* Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Top Actions */}
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
        onAdd={async (newDish) => {
          try {
            const created = await callRpc("menu.create", newDish);
            setItems((prev) => [created, ...prev]);
            toast.success("New dish saved to DB!");
          } catch (err: any) {
            toast.error("Failed to save dish: " + err.message);
          }
        }}
      />

      {/* Grid of Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onDelete={async (id) => {
              try {
                await callRpc("menu.delete", { id });
                setItems((prev) => prev.filter((dish) => dish.id !== id));
                toast.success("Dish deleted successfully");
              } catch (err: any) {
                toast.error("Delete failed: " + err.message);
              }
            }}
            onEdit={async (updatedDish) => {
              try {
                const updated = await callRpc("menu.update", updatedDish);
                setItems((prev) =>
                  prev.map((dish) => (dish.id === updated.id ? updated : dish))
                );
                toast.success("Dish updated!");
              } catch (err: any) {
                toast.error("Update failed: " + err.message);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
