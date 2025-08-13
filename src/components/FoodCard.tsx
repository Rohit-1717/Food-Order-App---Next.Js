"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";

type FoodItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
};

export default function FoodCard({ item }: { item: FoodItem }) {
  const { isAuthenticated } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    if (!isAuthenticated) {
      toast.warning("Please login first!", {
        description: "Login to add items and get your meal in 10 mins 🍱",
      });
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });

    toast.success(`${item.name} added to cart!`, {
      description: "Check your cart to complete the order.",
    });
  };

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-md transition flex flex-col">
      <Link href={`/menu/item/${item.slug}`}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-40 object-cover rounded"
        />
      </Link>

      <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
      <p className="text-sm text-muted-foreground">₹{item.price}</p>

      <Button variant="order" className="mt-3 w-full" onClick={handleAdd}>
        Add to Cart
      </Button>
    </div>
  );
}
