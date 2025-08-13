"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useAuthStore } from "@/lib/store/auth";

export default function CartPage() {
  const { isAuthenticated } = useAuthStore();

  const cart = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQuantity);
  const total = useCartStore((state) => state.totalAmount());

  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  // 🚫 Show message for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <ShoppingCart className="w-20 h-20 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Login Required</h2>
        <p className="text-muted-foreground mb-4">
          Please login to view and manage your cart.
        </p>
        <Link href="/auth/login">
          <Button>Login to Continue</Button>
        </Link>
      </div>
    );
  }

  // 🛒 Show empty cart UI
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

  // ✅ Authenticated + Cart has items
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
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => router.push("/payment")}
        >
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
}
