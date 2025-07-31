import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const order = {
  id: "ORD123456",
  status: "Out for Delivery",
  placedAt: "2025-07-30T14:45:00Z",
  progress: 66,
  items: [
    {
      name: "Paneer Tikka Pizza",
      image: "https://foodish-api.com/images/pizza/pizza28.jpg",
      qty: 1,
      price: 299,
    },
    {
      name: "Choco Lava Cake",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=464",
      qty: 2,
      price: 99,
    },
  ],
};

export default function TrackOrderPage() {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-16 py-8 bg-background text-foreground">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Track Your Order</h1>

      {/* Order Info */}
      <Card className="mb-6">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.placedAt).toLocaleString()}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {order.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={order.progress} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {order.status === "Preparing" && "Your food is being prepared."}
            {order.status === "Out for Delivery" &&
              "Delivery partner is on the way."}
            {order.status === "Delivered" && "Order has been delivered."}
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Items in this Order</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-base">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ₹{item.price} × {item.qty}
                </p>
              </div>
              <p className="text-sm font-semibold">₹{item.price * item.qty}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support (Optional) */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Facing issues? Contact kitchen support.
        </p>
        <Button variant="outline" size="sm">
          Contact Support
        </Button>
      </div>
    </section>
  );
}
