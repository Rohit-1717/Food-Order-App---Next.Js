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

  // ✅ Fetch menu items from backend on mount
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

  // ✅ Apply category filter
  let filteredItems = items.filter((item) => {
    if (!selectedCategory || selectedCategory === "All") return true;

    if (selectedCategory === "Offers") {
      return item.discount !== undefined && item.discount > 0;
    }

    // Normalize Desert/Desserts edge case
    if (selectedCategory === "Deserts") {
      return (
        item.category === "Dessert" ||
        item.category === "Desserts" ||
        item.category === "Desert"
      );
    }

    return item.category === selectedCategory;
  });

  // ✅ Apply search
  filteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Apply sorting
  filteredItems.sort((a, b) =>
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

      {/* Actions */}
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
            toast.success(`${created.name} added to menu`);
          } catch (err: any) {
            toast.error("Failed to save dish: " + err.message);
          }
        }}
      />

      {/* Menu Items */}
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
                toast.success(`${updated.name} updated successfully`);
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
