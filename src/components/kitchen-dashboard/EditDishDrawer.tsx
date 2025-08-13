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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { MenuItem } from "@/types/types";
import { toast } from "sonner";

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
    discount: dish.discount ?? undefined,
  });

  const [imagePreview, setImagePreview] = useState<string>(dish.image || "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm({
      ...dish,
      category: dish.category || "",
      discount: dish.discount ?? undefined,
    });
    setImagePreview(dish.image || "");
  }, [dish]);

  const handleChange = (field: keyof MenuItem, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`);
      }

      const data = await res.json();

      if (data.success && data.data?.secure_url) {
        const imageUrl = data.data.secure_url;
        handleChange("image", imageUrl);
        setImagePreview(imageUrl);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload failed: Invalid response");
      }
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill in all required fields (name, price, category)");
      return;
    }

    const updateParams: any = {
      id: form.id,
      name: form.name,
      price: +form.price,
      category: form.category,
      deliveryTime: form.deliveryTime ?? 30,
    };

    // Always include image field, even if empty
    updateParams.image = form.image || "";

    if (
      form.discount !== undefined &&
      form.discount !== null &&
      !isNaN(form.discount) &&
      form.discount > 0
    ) {
      updateParams.discount = +form.discount;
    }

    try {
      const response = await fetch("/api/rpc", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "menu.update",
          params: updateParams,
          id: 1,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (result.error) {
        toast.error(
          "Failed to update dish: " + (result.error.message || "Unknown error")
        );
        return;
      }

      const updated: MenuItem = {
        ...dish,
        ...form,
        price: +form.price,
        discount:
          form.discount && form.discount > 0 ? +form.discount : undefined,
        deliveryTime: form.deliveryTime ?? 30,
      };

      onSave(updated);
      toast.success(`${updated.name} updated successfully!`);
      setOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-xl mx-auto rounded-t-lg md:rounded-md">
        <DrawerHeader className="px-4 md:px-6">
          <DrawerTitle>Edit Dish</DrawerTitle>
          <DrawerDescription>Update the dish details</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 md:px-6 py-4 space-y-6 overflow-y-auto max-h-[80vh]">
          <div className="grid gap-2">
            <Label htmlFor="name">Dish Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Paneer Butter Masala"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => handleChange("price", +e.target.value)}
              placeholder="e.g. 250"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              value={form.discount ?? ""}
              onChange={(e) =>
                handleChange(
                  "discount",
                  e.target.value ? +e.target.value : undefined
                )
              }
              placeholder="e.g. 10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="deliveryTime">Delivery Time (minutes)</Label>
            <Input
              id="deliveryTime"
              type="number"
              min="5"
              max="120"
              value={form.deliveryTime ?? 30}
              onChange={(e) => handleChange("deliveryTime", +e.target.value)}
              placeholder="e.g. 30"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Dish Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Validate file size (e.g., max 5MB)
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image size should be less than 5MB");
                    return;
                  }
                  handleImageUpload(file);
                }
              }}
              disabled={uploading}
            />

            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Uploading image...
              </div>
            )}

            {imagePreview && !uploading && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Dish preview"
                  className="w-full h-40 object-cover rounded-md border"
                  onError={(e) => {
                    console.error("Image failed to load:", imagePreview);
                    setImagePreview("");
                    handleChange("image", "");
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImagePreview("");
                    handleChange("image", "");
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter className="px-4 md:px-6 pb-4 md:pb-6">
          <Button
            className="w-full"
            onClick={handleSave}
            disabled={uploading || !form.name || !form.price || !form.category}
          >
            {uploading ? "Uploading..." : "Save Changes"}
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
