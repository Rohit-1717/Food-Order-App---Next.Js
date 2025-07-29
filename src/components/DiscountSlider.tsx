"use client";

import { useKeenSlider } from "keen-slider/react";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function AutoplayPlugin(slideInterval = 500) {
  return (slider: any) => {
    let timeout: NodeJS.Timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, slideInterval);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };
}

const discountedFoods = [
  {
    name: "Cheese Pizza",
    image:
      "https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg",
    discount: "30% OFF",
    price: "₹249",
  },
  {
    name: "Grilled Burger",
    image:
      "https://img.freepik.com/free-photo/front-view-burgers-stand_141793-15545.jpg?t=st=1753791676~exp=1753795276~hmac=61995cc73d7684c36379db040adb243279a617a7ebbfd918e7e0b76c1c8ec8d3&w=360",
    discount: "20% OFF",
    price: "₹189",
  },
  {
    name: "Tandoori Chicken",
    image:
      "https://img.freepik.com/free-photo/top-view-delicious-chicken-meal_23-2148825124.jpg",
    discount: "25% OFF",
    price: "₹299",
  },
  {
    name: "Veg Pasta",
    image:
      "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg",
    discount: "35% OFF",
    price: "₹179",
  },
];

export default function DiscountSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 1.2,
        spacing: 12,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2.2, spacing: 16 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3.2, spacing: 20 },
        },
      },
    },
    [AutoplayPlugin(3000)]
  );

  return (
    <section className="px-4 md:px-6 lg:px-16 py-12 bg-background">
      <h2 className="text-xl font-bold mb-4 text-foreground">🔥 Hot Deals</h2>

      <div ref={sliderRef} className="keen-slider">
        {discountedFoods.map((item, idx) => (
          <Card
            key={idx}
            className="keen-slider__slide hover:shadow-lg transition-shadow"
          >
            <CardHeader className="relative h-40 sm:h-48 md:h-56 p-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-t-md"
              />
              <Badge variant={"destructive"} className="absolute top-2 left-2  text-white">
                {item.discount}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-center">
              <h3 className="font-semibold text-lg text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.price}</p>
              <Button className="w-full" variant="order">
                Order Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
