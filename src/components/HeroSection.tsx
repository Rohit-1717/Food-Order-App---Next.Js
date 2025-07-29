"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import food_img from "../../public/freepik__adjust__93277.png";

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full">
      {/* Background Image */}
      <Image
        src={food_img}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-12 justify-center lg:justify-start">
        <div className="max-w-2xl w-full space-y-6 text-center lg:text-left">
          <span className="text-sm sm:text-base font-semibold uppercase tracking-wide text-muted-foreground">
            Easy way to order your food 🍕
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-snug">
            Order Healthy And Fresh Food Any Time
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Italian food makes people think of big family dinners. So you may
            want to position your restaurant as a place to bring the whole
            family.
          </p>

          <div className="w-full flex justify-center lg:justify-start">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg px-6 py-2 sm:px-8 sm:py-3 rounded-md">
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
