"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BadgePercent, Utensils, Coffee, Sandwich, Salad } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const categories = [
  { name: "All", icon: Utensils },
  { name: "Starters", icon: Salad },
  { name: "Main Course", icon: Sandwich },
  { name: "Beverages", icon: Coffee },
  { name: "Offers", icon: BadgePercent },
];

export function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(selectedCategory);

  useEffect(() => {
    setActive(selectedCategory);
  }, [selectedCategory]);

  const handleClick = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
  };

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex gap-2 pb-2">
        {categories.map((cat) => {
          const isActive =
            active === cat.name || (cat.name === "All" && active === null);
          return (
            <Button
              key={cat.name}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn("shrink-0 flex items-center gap-1 px-3", {
                "bg-primary text-primary-foreground": isActive,
              })}
              onClick={() => handleClick(cat.name)}
            >
              <cat.icon size={16} />
              <span className="text-sm">{cat.name}</span>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
