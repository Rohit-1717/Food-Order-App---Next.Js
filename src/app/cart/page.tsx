"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const dummyCart: CartItem[] = [
  {
    id: 1,
    name: "Veg Pizza",
    price: 209,
    quantity: 1,
    image: "https://foodish-api.com/images/pizza/pizza95.jpg",
  },
  {
    id: 2,
    name: "Burger",
    price: 159,
    quantity: 2,
    image: "https://foodish-api.com/images/burger/burger13.jpg",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(dummyCart); // Replace with Zustand later
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("");

  const updateQty = (id: number, value: number) => {
    setCart((prev) =>
      value <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) =>
            item.id === id ? { ...item, quantity: value } : item
          )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <ShoppingCart className="w-20 h-20 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-4">
          Add some delicious food to your cart.
        </p>
        <Link href="/menu">
          <Button>Add Meal to Cart</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="flex items-center gap-4 p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">₹{item.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  min={0}
                  className="w-12 text-center px-1 py-1 h-8 text-sm"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQty(item.id, parseInt(e.target.value) || 0)
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">
              ₹{item.price * item.quantity}
            </div>
          </Card>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Input
          placeholder="Apply coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="sm:w-[300px]"
        />
        <Button variant="secondary">Apply</Button>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-medium mb-2">Shipping Address</h3>
        <Input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Total and Proceed */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
        <div className="text-lg font-semibold">Total: ₹{total}</div>
        <Button size="lg" className="w-full sm:w-auto">
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
}
