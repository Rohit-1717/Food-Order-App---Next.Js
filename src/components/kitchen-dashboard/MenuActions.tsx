"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface MenuActionsProps {
  search: string;
  setSearch: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  onAddNew: () => void;
}

export function MenuActions({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  onAddNew,
}: MenuActionsProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
      {/* Search and Sort */}
      <div className="flex gap-2 flex-1 w-full">
        <Input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 whitespace-nowrap"
            >
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>
              A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>
              Z-A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Add Dish Button */}
      <Button
        onClick={onAddNew}
        className="flex items-center gap-2 whitespace-nowrap"
      >
        <Plus className="h-4 w-4" />
        Add New Dish
      </Button>
    </div>
  );
}
