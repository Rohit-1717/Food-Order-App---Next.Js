"use client";

import { useState } from "react";
import { Topbar } from "@/components/kitchen-dashboard/Topbar";
import { Sidebar } from "@/components/kitchen-dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (drawer on mobile, static on md+) */}
        <aside
          className={`fixed z-40 md:relative md:translate-x-0 transition-transform transform bg-muted w-64 border-r h-full ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:block`}
        >
          <Sidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto mx-auto px-4 md:px-6 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
