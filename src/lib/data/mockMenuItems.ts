import { MenuItem } from "@/types/types";

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    price: 240,
    category: "Main Course",
    isAvailable: true,
    discount: 10,
    variants: ["Medium", "Spicy"],
  },
  {
    id: "2",
    name: "Chicken Biryani",
    price: 280,
    category: "Main Course",
    isAvailable: true,
    variants: ["Large", "Extra Spicy"],
  },
  {
    id: "3",
    name: "Veg Spring Rolls",
    price: 120,
    category: "Starters",
    isAvailable: false,
  },
  {
    id: "4",
    name: "Masala Dosa",
    price: 90,
    category: "South Indian",
    isAvailable: true,
    discount: 15,
  },
  {
    id: "5",
    name: "Cold Coffee",
    price: 80,
    category: "Beverages",
    isAvailable: true,
  },
  {
    id: "6",
    name: "Tandoori Chicken",
    price: 350,
    category: "Starters",
    isAvailable: true,
    variants: ["Half", "Full"],
  },
  {
    id: "7",
    name: "Chole Bhature",
    price: 130,
    category: "North Indian",
    isAvailable: true,
    discount: 20,
  },
];
