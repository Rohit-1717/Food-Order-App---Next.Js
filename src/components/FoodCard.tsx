type FoodItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-md transition">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
      <p className="text-sm text-muted-foreground">₹{item.price}</p>
    </div>
  );
}
