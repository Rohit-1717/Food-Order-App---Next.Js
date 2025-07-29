import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import PopularRestaurantSection from "@/components/PopularRestaurantSection";
import DiscountSlider from "@/components/DiscountSlider";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <HeroSection />
      <DiscountSlider />
      <CategorySection />
    </main>
  );
}

export const metadata = {
  title: "Foodie | Order Fresh Food Online",
  description: "Order healthy and fresh food anytime with Foodie",
};
