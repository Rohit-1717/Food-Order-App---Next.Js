"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import { createMenuSchema } from "@/app/api/rpc/schemas/menu/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth";

type CreateMenuInput = z.infer<typeof createMenuSchema>;

export interface AddDishModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newDish: CreateMenuInput) => void;
}

export function AddDishModal({ open, setOpen, onAdd }: AddDishModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [variants, setVariants] = useState<string[]>([]);
  const [variantInput, setVariantInput] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAddVariant = () => {
    if (variantInput.trim()) {
      setVariants([...variants, variantInput.trim()]);
      setVariantInput("");
    }
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
        setImage(imageUrl);
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

  const handleSubmit = () => {
    if (!name || !price || !category) return;

    const kitchenId = useAuthStore.getState().user?.id;

    if (!kitchenId) {
      toast.error("Kitchen ID not found. Please login again.");
      return;
    }

    const newDish: CreateMenuInput = {
      name,
      price: parseFloat(price),
      image,
      category,
      type: "veg",
      kitchenId, // ✅ dynamically set
      deliveryTime: 30,
      rating: 4.5,
      discount: discount || undefined,
    };

    onAdd(newDish);
    setOpen(false);

    // Reset form
    setName("");
    setPrice("");
    setCategory("");
    setDiscount("");
    setIsAvailable(true);
    setVariants([]);
    setImage("");
    setImagePreview("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="grid gap-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid gap-1">
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Starters">Starters</SelectItem>
                <SelectItem value="Main Course">Main Course</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Desert">Deserts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>Dish Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              disabled={uploading}
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Uploading image...
              </div>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Dish preview"
                className="w-24 h-24 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="grid gap-1">
            <Label>Discount (%)</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="available"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="available">
              {isAvailable ? "Available" : "Unavailable"}
            </Label>
          </div>

          <div className="grid gap-1">
            <Label>Variants</Label>
            <div className="flex gap-2">
              <Input
                value={variantInput}
                onChange={(e) => setVariantInput(e.target.value)}
                placeholder="e.g. Spicy"
              />
              <Button type="button" onClick={handleAddVariant}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {variants.map((v, i) => (
                <Badge key={i} variant="secondary">
                  {v}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Add Dish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
