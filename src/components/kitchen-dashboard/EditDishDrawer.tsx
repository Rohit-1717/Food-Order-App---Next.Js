"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { MenuItem } from "@/types/types";

interface EditDishDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dish: MenuItem;
  onSave: (updatedDish: MenuItem) => void;
}

export function EditDishDrawer({
  open,
  setOpen,
  dish,
  onSave,
}: EditDishDrawerProps) {
  const [form, setForm] = useState<MenuItem>({
    ...dish,
    category: dish.category || "",
  });

  const [imagePreview, setImagePreview] = useState<string>(dish.image || "");

  useEffect(() => {
    setForm({ ...dish, category: dish.category || "" });
    setImagePreview(dish.image || "");
  }, [dish]);

  const handleChange = (field: keyof MenuItem, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.category) return;
    onSave(form);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-xl mx-auto rounded-t-lg md:rounded-md">
        <DrawerHeader className="px-4 md:px-6">
          <DrawerTitle>Edit Dish</DrawerTitle>
          <DrawerDescription>
            Update the dish details and availability
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 md:px-6 py-4 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Dish Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Paneer Butter Masala"
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", +e.target.value)}
              placeholder="e.g. 250"
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category || ""}
              onValueChange={(val) => handleChange("category", val)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Starters">Starters</SelectItem>
                <SelectItem value="Main Course">Main Course</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Desserts">Desserts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image URL */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image || ""}
              onChange={(e) => {
                handleChange("image", e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="Paste image URL here"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Dish preview"
                className="w-full h-40 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between">
            <Label>Available</Label>
            <Switch
              checked={form.isAvailable}
              onCheckedChange={(val) => handleChange("isAvailable", val)}
            />
          </div>
        </div>

        <DrawerFooter className="px-4 md:px-6 pb-4 md:pb-6">
          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
