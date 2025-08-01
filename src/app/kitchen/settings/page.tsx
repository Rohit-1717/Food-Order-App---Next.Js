import { DashboardLayout } from "@/components/kitchen-dashboard/DashboardLayout";
import KitchenSettingsForm from "@/components/kitchen-dashboard/KitchenSettingsForm";
import React from "react";

function page() {
  return (
    <div className="min-h-screen overflow-hidden">
      <DashboardLayout>
        <KitchenSettingsForm />
      </DashboardLayout>
    </div>
  );
}

export default page;
