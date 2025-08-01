"use client";

import React from "react";
import { OrderCard, Order } from "./OrderCard";

const mockOrders: Order[] = [
  {
    id: "101",
    customerName: "Aman Gupta",
    time: new Date().toISOString(),
    paymentMode: "UPI",
    paymentDetails: "Paid ₹520 via GPay",
    status: "pending",
  },
  {
    id: "102",
    customerName: "Nisha Verma",
    time: new Date().toISOString(),
    paymentMode: "COD",
    paymentDetails: "Cash on Delivery",
    status: "accepted",
  },
  {
    id: "103",
    customerName: "Rahul Sinha",
    time: new Date().toISOString(),
    paymentMode: "Card",
    paymentDetails: "Paid ₹340 via Visa",
    status: "preparing",
  },

  {
    id: "104",
    customerName: "Priya Sharma",
    time: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    paymentMode: "UPI",
    paymentDetails: "Paid ₹525 via PhonePe",
    status: "pending",
  },
  {
    id: "105",
    customerName: "Amit Kumar",
    time: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 mins ago
    paymentMode: "Cash",
    paymentDetails: "₹280 - Cash on Delivery",
    status: "accepted",
  },
  {
    id: "106",
    customerName: "Sneha Patel",
    time: new Date(Date.now() - 22 * 60 * 1000).toISOString(), // 22 mins ago
    paymentMode: "Card",
    paymentDetails: "Paid ₹675 via Mastercard",
    status: "ready",
  },
  {
    id: "107",
    customerName: "Vikash Singh",
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    paymentMode: "UPI",
    paymentDetails: "Paid ₹450 via GPay",
    status: "pending",
  },
  {
    id: "108",
    customerName: "Ritu Agarwal",
    time: new Date(Date.now() - 18 * 60 * 1000).toISOString(), // 18 mins ago
    paymentMode: "Card",
    paymentDetails: "Paid ₹320 via Visa",
    status: "preparing",
  },
  {
    id: "109",
    customerName: "Manish Gupta",
    time: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
    paymentMode: "UPI",
    paymentDetails: "Paid ₹890 via Paytm",
    status: "out-for-delivery",
  },
  {
    id: "110",
    customerName: "Kavita Joshi",
    time: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 mins ago
    paymentMode: "Cash",
    paymentDetails: "₹150 - Cash on Delivery",
    status: "pending",
  },
];

export default function IncomingOrdersList() {
  return (
    <div className="h-full flex flex-col">
      {/* Sticky Heading */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 md:px-6 py-2">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">
          Incoming Orders
        </h2>
      </div>

      {/* Scrollable Orders List */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
