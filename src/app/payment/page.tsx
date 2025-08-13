"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart";

import { CheckCircle2, IndianRupee } from "lucide-react";
import Image from "next/image";

export default function PaymentPage() {
  const { totalAmount } = useCartStore();

  const handleRazorpay = () => {
    // Razorpay integration logic will go here
    console.log("Razorpay clicked");
  };

  const handleCashOnDelivery = () => {
    console.log("Cash on delivery selected");
  };

  return (
    <div className="mx-auto px-4 md:px-6 py-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Select Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-base md:text-lg font-medium">Total Amount</p>
            <div className="flex items-center gap-1 font-semibold text-lg">
              <IndianRupee className="w-5 h-5" />
              <span className="text-xl font-bold">{totalAmount()}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Button
              onClick={handleRazorpay}
              className="w-full flex items-center gap-2 text-base md:text-lg"
              variant="default"
            >
              Pay with Razorpay
            </Button>

            <Button
              onClick={handleCashOnDelivery}
              className="w-full flex items-center gap-2 text-base md:text-lg"
              variant="outline"
            >
              <CheckCircle2 className="w-5 h-5" />
              Cash on Delivery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
