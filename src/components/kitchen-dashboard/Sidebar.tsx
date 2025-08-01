"use client";

import {
  LayoutDashboard,
  UtensilsCrossed,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/kitchen/dashboard",
  },
  {
    label: "Orders",
    icon: UtensilsCrossed,
    href: "/kitchen/orders",
  },
    {
    label: "Menu",
    icon: UtensilsCrossed,
    href: "/kitchen/menu",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/kitchen/settings",
  },
];

export function Sidebar() {
  return (
    <div className="h-full flex flex-col justify-between bg-background text-foreground mx-auto px-4 md:px-12 py-4 ">
      <div className="space-y-2">
        <h1 className="text-lg font-bold px-2">Kitchen</h1>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t mt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
