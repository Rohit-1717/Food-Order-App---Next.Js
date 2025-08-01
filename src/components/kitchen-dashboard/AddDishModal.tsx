"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/types";



export interface AddDishModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newDish: MenuItem) => void;
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

  const handleAddVariant = () => {
    if (variantInput.trim()) {
      setVariants([...variants, variantInput.trim()]);
      setVariantInput("");
    }
  };

  const handleSubmit = () => {
    if (!name || !price || !category) return;

    const newDish: MenuItem = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      discount: discount ? parseFloat(discount) : undefined,
      isAvailable,
      variants,
      image,
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
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Image URL</Label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/dish.jpg"
            />
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
