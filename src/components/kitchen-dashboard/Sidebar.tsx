"use client";

import {
  LayoutDashboard,
  UtensilsCrossed,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth";
import { toast } from "sonner";

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/kitchen/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error?.message || "Logout failed");
      // Even if logout fails on server, redirect to login
      router.push("/kitchen/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-background text-foreground mx-auto px-4 md:px-12 py-4">
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
        </nav>
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
