import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";

type OrderItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  totalAmount: number;
  items: OrderItem[];
  status: "Delivered" | "Cancelled" | "Not Delivered";
  invoiceUrl: string;
};

const orderHistory: Order[] = [
  {
    id: "ORD123456",
    date: "2025-07-28",
    totalAmount: 749,
    status: "Delivered",
    invoiceUrl: "/invoices/order-ORD123456.pdf",
    items: [
      {
        name: "Cheese Pizza",
        image: "https://foodish-api.com/images/pizza/pizza28.jpg",
        price: 249,
        quantity: 2,
      },
      {
        name: "Gulab Jamun",
        image:
          "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
        price: 251,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD123789",
    date: "2025-07-21",
    totalAmount: 399,
    status: "Cancelled",
    invoiceUrl: "/invoices/order-ORD123789.pdf",
    items: [
      {
        name: "Masala Dosa",
        image: "https://foodish-api.com/images/dosa/dosa20.jpg",
        price: 199,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD123990",
    date: "2025-07-10",
    totalAmount: 299,
    status: "Not Delivered",
    invoiceUrl: "/invoices/order-ORD123990.pdf",
    items: [
      {
        name: "Veg Pasta",
        image: "https://foodish-api.com/images/pasta/pasta22.jpg",
        price: 299,
        quantity: 1,
      },
    ],
  },
];

function getBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "success";
    case "cancelled":
    case "not delivered":
      return "destructive";
    default:
      return "outline";
  }
}

export default function OrderPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background px-4 sm:px-6 lg:px-16 py-4 border-b">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          🧾 Your Orders
        </h1>
      </div>

      {/* Scrollable Order List */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-16 py-6 space-y-6 scrollbar-hide">
        {orderHistory.map((order) => (
          <Card
            key={order.id}
            className="border shadow-sm hover:shadow-md transition duration-200"
          >
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h2 className="font-semibold text-lg text-foreground">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Placed on {order.date}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Badge
                  variant={getBadgeVariant(order.status)}
                  className="capitalize"
                >
                  {order.status}
                </Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={order.invoiceUrl} download>
                    <DownloadIcon className="w-4 h-4" />
                    Invoice
                  </a>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-end">
                <p className="text-base font-bold text-primary">
                  Total: ₹ {order.totalAmount}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {orderHistory.length === 0 && (
          <p className="text-muted-foreground text-sm text-center">
            You haven't placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
}
