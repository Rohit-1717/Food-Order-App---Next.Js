export type FiltersType = {
  vegOnly: boolean;
  rating4Plus: boolean;
  fastDelivery: boolean;
  sortBy: "deliveryTime" | "rating" | "costLow" | "costHigh" | "";
};

// src/types/MenuItem.ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  image?: string;
  discount?: number;
  variants?: string[];
  isOffer?: boolean;
}

export interface AddDishModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (newDish: MenuItem) => void;
}
