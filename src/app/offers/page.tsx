"use client";

import { mockMenuData } from "@/lib/data/menuData";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import OfferBanner from "@/components/OfferBanner";
import { useCartStore } from "@/lib/store/cart"; // ✅ Zustand cart store
import { toast } from "sonner"; // ✅ Sonner toast

const discountedItems = mockMenuData.filter((item) => item.discount);

export default function OfferPage() {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (item: (typeof mockMenuData)[0]) => {
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
    <div className="flex flex-col h-screen overflow-hidden px-4 sm:px-6 lg:px-16 my-4">
      <OfferBanner />

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-16 pb-10 space-y-6 scrollbar-hide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discountedItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between hover:shadow-md transition-all"
            >
              <CardHeader className="relative h-44 p-0 rounded-t-md overflow-hidden">
                <Link href={`/menu/item/${item.slug}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <Badge className="absolute top-2 left-2 bg-destructive text-white text-xs shadow-sm">
                  {item.discount}
                </Badge>
              </CardHeader>

              <CardContent className="p-4 space-y-1">
                <Link href={`/menu/item/${item.slug}`}>
                  <h3 className="text-base font-semibold hover:underline">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{item.price}</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  variant="order"
                  size="sm"
                  className="w-full text-sm font-medium hover:text-white"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
