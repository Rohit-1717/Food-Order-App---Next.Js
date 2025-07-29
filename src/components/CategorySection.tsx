import Image from "next/image";
import { Card, CardContent } from "./ui/card";

const categories = [
  {
    name: "Indian",
    image:
      "https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg",
    products: 14,
  },
  {
    name: "Italian",
    image:
      "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg",
    products: 4,
  },
  {
    name: "Chinese",
    image:
      "https://img.freepik.com/free-photo/stir-fry-chicken-zucchini-sweet-peppers-green-onion-with-chopsticks_2829-10785.jpg",
    products: 5,
  },
  {
    name: "Mexican",
    image:
      "https://img.freepik.com/free-photo/delicious-tacos-table_23-2150857826.jpg",
    products: 19,
  },
  {
    name: "Thai",
    image:
      "https://img.freepik.com/free-photo/delicious-thai-food-still-life_23-2149508908.jpg",
    products: 22,
  },
  {
    name: "Japanese",
    image:
      "https://img.freepik.com/free-photo/asian-dish-with-wasabi-soy-sauce_23-2148195591.jpg",
    products: 6,
  },
  {
    name: "American",
    image:
      "https://img.freepik.com/free-photo/macaroni-with-cheese-chicken-mushrooms-baked-oven_2829-11130.jpg",
    products: 10,
  },
  {
    name: "Mediterranean",
    image:
      "https://img.freepik.com/free-photo/meat-sadj-vegetables-greens-spices-top-view_140725-11308.jpg",
    products: 15,
  },
  {
    name: "French",
    image:
      "https://img.freepik.com/free-photo/stuffed-zucchini-with-chicken-tomatoes-onion-with-cheese-crust_2829-14444.jpg",
    products: 8,
  },
  {
    name: "Middle Eastern",
    image:
      "https://img.freepik.com/free-photo/indian-meal-with-rice-sari_23-2148747624.jpg",
    products: 11,
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="text-yellow-600 font-bold tracking-wide uppercase">
          Top Foods
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Our Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
          {categories.map((cat, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative w-full h-32 md:h-40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="text-left p-4 space-y-1">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cat.products} Products
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
