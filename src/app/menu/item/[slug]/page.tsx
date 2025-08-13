"use client";

import { notFound } from "next/navigation";
import { mockMenuData as originalMockMenuData } from "@/lib/data/menuData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner"; // ✅ Sonner

// Generate slug for each item
const mockMenuData = originalMockMenuData.map((item) => ({
  ...item,
  slug: item.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, ""),
}));

interface Props {
  params: {
    slug: string;
  };
}

export default function SingleItemPage({ params }: Props) {
  const { slug } = params;

  const item = mockMenuData.find((food) => food.slug === slug);

  const addToCart = useCartStore((state) => state.addToCart); // ✅ get action from store

  const handleAdd = () => {
    if (!item) return;

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });

    toast.success(`${item.name} added to cart!`, {
      description: "You can view your cart to place the order.",
    });
  };

  if (!item) return notFound();

  return (
    <section className="min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto bg-card shadow-xl rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left Side - Responsive Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {item.discount && (
              <Badge
                variant="destructive"
                className="absolute top-3 left-3 text-white text-sm"
              >
                {item.discount}
              </Badge>
            )}
          </div>
        </div>

        {/* Right Side - Item Details */}
        <div className="flex-1 flex flex-col justify-between space-y-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{item.name}</h1>

            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className="capitalize">
                {item.type}
              </Badge>
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant="outline">⭐ {item.rating}</Badge>
              <Badge variant="outline">⏱ {item.deliveryTime} mins</Badge>
            </div>

            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Experience the taste of {item.name}, a delicious {item.category}{" "}
              dish made with authentic ingredients. Perfect for{" "}
              {item.type === "veg"
                ? "vegetarian lovers"
                : "non-vegetarian enthusiasts"}
              .
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-2xl font-bold text-primary">₹{item.price}</p>

            <Button
              variant="order"
              size="lg"
              className="w-full sm:w-fit"
              onClick={handleAdd} // ✅ Add to Cart logic
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
