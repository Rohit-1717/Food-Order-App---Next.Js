import { DashboardLayout } from "@/components/kitchen-dashboard/DashboardLayout";
import { MenuList } from "@/components/kitchen-dashboard/MenuList";
import React from "react";

function page() {
  return (
    <DashboardLayout>
      <MenuList />
    </DashboardLayout>
  );
}

export default page;
