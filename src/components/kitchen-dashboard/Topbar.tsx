"use client";

import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store/auth";

type TopbarProps = {
  onToggleSidebar: () => void;
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const { user, isAuthenticated, mode } = useAuthStore();

  const isKitchenAdmin = isAuthenticated && mode === "kitchen";

  const displayName = isKitchenAdmin
    ? user?.fullName || "Kitchen Admin"
    : "Guest";
  const avatarUrl = isKitchenAdmin
    ? user?.avatar || "/avatar.jpg"
    : "/avatar.jpg";
  const fallbackInitials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-14 py-4 border-b bg-background">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={onToggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Welcome, {displayName} 👋</h1>
      </div>

      {/* Right - Avatar */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatarUrl} alt="User Avatar" />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
