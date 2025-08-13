"use client";

import React from "react";
import { useAuthStore } from "@/lib/store/auth";

function Notifications() {
  // Get auth state from store
  const { isAuthenticated, mode } = useAuthStore();

  // Hide notifications if user is authenticated and in kitchen mode
  if (isAuthenticated && mode === "kitchen") {
    return null;
  }

  return (
    <div className="h-12 bg-orange-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer">
      <p>
        🤑 New here? Get <span className="font-bold text-black">75% OFF</span>{" "}
        using coupon <span className="font-bold">NEW75</span> on your first
        order!
      </p>
    </div>
  );
}

export default Notifications;
