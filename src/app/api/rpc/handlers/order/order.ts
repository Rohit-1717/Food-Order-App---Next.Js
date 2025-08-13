// rpc/handlers/order/order.ts

import Razorpay from "razorpay";
import { z } from "zod";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

const paymentParams = z.object({
  amount: z.number().min(1), // amount in INR
});

export async function createPaymentOrder(input: unknown) {
  const { amount } = paymentParams.parse(input);

  const options = {
    amount: amount * 100, // in paisa
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
}
