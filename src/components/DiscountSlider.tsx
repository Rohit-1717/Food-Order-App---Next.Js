"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockMenuData } from "@/lib/data/menuData";

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

// 🔥 Filter items with discount
const hotDeals = mockMenuData
  .filter((item) => item.discount)
  .map((item) => ({
    ...item,
    slug: item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, ""),
  }));

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
        {hotDeals.map((item) => (
          <Card
            key={item.id}
            className="keen-slider__slide hover:shadow-lg transition-shadow"
          >
            <Link href={`/menu/item/${item.slug}`}>
              <CardHeader className="relative h-40 sm:h-48 md:h-56 p-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-t-md"
                />
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 text-white"
                >
                  {item.discount}
                </Badge>
              </CardHeader>
            </Link>

            <CardContent className="p-4 space-y-2 text-center">
              <h3 className="font-semibold text-lg text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">₹{item.price}</p>
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
