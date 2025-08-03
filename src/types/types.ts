export type FiltersType = {
  vegOnly: boolean;
  rating4Plus: boolean;
  fastDelivery: boolean;
  sortBy: "deliveryTime" | "rating" | "costLow" | "costHigh" | "";
};

// src/types/MenuItem.ts
export type MenuItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  type: "veg" | "non-veg";
  rating?: number;
  deliveryTime: number;
  category: string;
  discount?: number;
  isAvailable: boolean;
  kitchenId: string;
  createdAt?: string;
  updatedAt?: string;
  variants?: string[];
};

export interface AddDishModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newDish: MenuItem) => void;
}
