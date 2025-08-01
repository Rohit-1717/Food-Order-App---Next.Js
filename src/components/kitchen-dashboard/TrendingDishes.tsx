"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dishes = [
  {
    name: "Paneer Tikka",
    image: "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    orders: 126,
    tag: "Veg",
  },
  {
    name: "Chicken Biryani",
    image: "https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    orders: 109,
    tag: "Non-Veg",
  },
  {
    name: "Cheese Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    orders: 87,
    tag: "Fast Food",
  },
  {
    name: "Veg Manchurian",
    image: "https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?t=st=1754039215~exp=1754042815~hmac=898bc50b8277abbb77f515f852dc619b00f29397e46ce1b2269f19a50979942d&w=826",
    orders: 78,
    tag: "Indo-Chinese",
  },
];

export function TrendingDishes() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Trending Dishes</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <Card key={dish.name} className="overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.name}
              width={500}
              height={300}
              className="w-full h-36 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-base">{dish.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{dish.tag}</Badge>
              <span className="text-sm text-muted-foreground">
                {dish.orders} orders
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
