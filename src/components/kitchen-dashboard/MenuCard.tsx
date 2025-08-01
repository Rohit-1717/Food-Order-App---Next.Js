"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Flame, Percent } from "lucide-react";
import { EditDishDrawer } from "./EditDishDrawer";
import { MenuItem } from "@/types/types";

interface MenuCardProps {
  item: MenuItem;
  onToggleAvailability?: (id: string, newState: boolean) => void;
  onEdit?: (updated: MenuItem) => void;
  onDelete?: (id: string) => void;
}

export function MenuCard({
  item,
  onToggleAvailability,
  onEdit,
  onDelete,
}: MenuCardProps) {
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [editOpen, setEditOpen] = useState(false);
  const [localItem, setLocalItem] = useState<MenuItem>(item);

  const handleToggle = () => {
    const newState = !isAvailable;
    setIsAvailable(newState);
    onToggleAvailability?.(localItem.id, newState);
  };

  const handleEditSave = (updated: MenuItem) => {
    setLocalItem(updated);
    onEdit?.(updated);
  };

  return (
    <>
      <Card className="w-full transition hover:shadow-md">
        <CardContent className="p-4 md:p-6 space-y-3">
          {/* Image (conditionally rendered) */}
          {localItem.image && (
            <div className="relative w-full h-40 overflow-hidden rounded-md">
              <img
                src={localItem.image}
                alt={localItem.name}
                className="w-full h-full object-cover rounded-md"
              />

              {localItem.discount && (
                <Badge className="absolute top-2 left-2 bg-red-900 text-white text-xs flex items-center gap-1 shadow-sm">
                  <Percent className="h-3 w-3" />
                  {localItem.discount}% OFF
                </Badge>
              )}
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">{localItem.name}</h4>
              <p className="text-muted-foreground text-sm capitalize">
                {localItem.category}
              </p>
            </div>
            <Badge variant="outline" className="text-base font-medium">
              ₹{localItem.price}
            </Badge>
          </div>

          {/* Variants */}
          {localItem.variants && localItem.variants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {localItem.variants.map((variant, idx) => (
                <Badge
                  key={idx}
                  className="text-xs bg-orange-100 text-orange-700 flex items-center gap-1"
                >
                  <Flame className="h-3 w-3" />
                  {variant}
                </Badge>
              ))}
            </div>
          )}

          {/* Availability & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Switch
                id={`switch-${localItem.id}`}
                checked={isAvailable}
                onCheckedChange={handleToggle}
              />
              <Label htmlFor={`switch-${localItem.id}`} className="text-sm">
                {isAvailable ? "Available" : "Unavailable"}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete?.(localItem.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Drawer */}
      <EditDishDrawer
        open={editOpen}
        setOpen={setEditOpen}
        dish={localItem}
        onSave={handleEditSave}
      />
    </>
  );
}
