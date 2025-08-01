"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar"; // ✅ Import the Topbar
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCharts } from "./DashboardCharts";
import { TrendingDishes } from "./TrendingDishes";

export function DashboardContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const cards = [
    {
      title: "Today’s Revenue",
      value: "₹18,450",
      change: "+8.2%",
      icon: DollarSign,
      up: true,
    },
    {
      title: "Today’s Orders",
      value: "126 Orders",
      change: "+5.4%",
      icon: ShoppingBag,
      up: true,
    },
    {
      title: "Avg. Expense",
      value: "₹5,130",
      change: "-2.1%",
      icon: TrendingDown,
      up: false,
    },
    {
      title: "Avg. Revenue",
      value: "₹7,220",
      change: "+3.6%",
      icon: TrendingUp,
      up: true,
    },
  ];

  return (
    <div className="flex w-full h-full overflow-hidden mx-auto px-4 md:px-6 py-4 ">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-[250px]">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="px-4 md:px-6 py-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="bg-muted text-foreground">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p
                      className={`text-sm mt-1 flex items-center gap-1 ${
                        card.up ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {card.up ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {card.change} from yesterday
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chart Section */}
          <DashboardCharts />

          {/* Trending Dishes Section */}
          <TrendingDishes />
        </main>
      </div>
    </div>
  );
}
