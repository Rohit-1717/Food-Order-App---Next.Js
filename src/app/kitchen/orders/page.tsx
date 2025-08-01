import { DashboardLayout } from "@/components/kitchen-dashboard/DashboardLayout";
import IncomingOrdersList from "@/components/kitchen-dashboard/IncomingOrdersList";
import React from "react";

export default function OrderPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <DashboardLayout>
        <IncomingOrdersList />
      </DashboardLayout>
    </div>
  );
}
