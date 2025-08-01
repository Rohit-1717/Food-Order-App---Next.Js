"use client";

import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TopbarProps = {
  onToggleSidebar: () => void;
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
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
        <h1 className="text-xl font-semibold">Welcome, Rohit 👋</h1>
      </div>

      {/* Right - Avatar */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <div className="text-sm leading-tight hidden md:block">
          <div className="font-medium">Rohit V</div>
          <div className="text-xs text-muted-foreground">Admin</div>
        </div>
      </div>
    </header>
  );
}
