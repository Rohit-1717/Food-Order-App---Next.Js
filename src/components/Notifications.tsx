import React from "react";

function Notifications() {
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