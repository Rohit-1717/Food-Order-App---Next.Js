import { Button } from "@/components/ui/button";
import Link from "next/link";

type FoodItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
};

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-md transition flex flex-col ">
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

      <Button variant="order" className="mt-3 w-full">
        Add to Cart
      </Button>
    </div>
  );
}
