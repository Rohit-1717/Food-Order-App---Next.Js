// components/home/PopularRestaurantSection.tsx
import Image from "next/image";

const restaurants = [
  { name: "Pizza King", image: "/images/pizza-rest.jpg" },
  { name: "Hot Drinks", image: "/images/drinks.jpg" },
  { name: "Grill Master", image: "/images/grill.jpg" },
];

export default function PopularRestaurantSection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="text-yellow-600 font-bold tracking-wide uppercase">
          Top Restaurants
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold">Popular Restaurant</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {restaurants.map((rest, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-48">
                <Image
                  src={rest.image}
                  alt={rest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-background text-left">
                <h3 className="font-semibold text-lg">{rest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
