import { mockMenuData } from "@/lib/data/menuData";
import FoodCard from "./FoodCard";
import { FiltersType } from "@/types/types";

export default function FoodGrid({
  search,
  filters,
}: {
  search: string;
  filters: FiltersType;
}) {
  const filtered = mockMenuData
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchVeg = filters.vegOnly ? item.type === "veg" : true;
      const matchRating = filters.rating4Plus ? item.rating >= 4 : true;
      const matchFast = filters.fastDelivery ? item.deliveryTime <= 30 : true;
      return matchSearch && matchVeg && matchRating && matchFast;
    })
    .sort((a, b) => {
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "costLow") return a.price - b.price;
      if (filters.sortBy === "costHigh") return b.price - a.price;
      return 0;
    });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-4">
      {filtered.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
}
