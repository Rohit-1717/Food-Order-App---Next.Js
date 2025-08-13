// lib/store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((i) => i.id !== id)
              : get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }),

      clearCart: () => set({ items: [] }),

      totalAmount: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage", // persisted in localStorage
    }
  )
);
