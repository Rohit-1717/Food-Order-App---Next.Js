"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function UserAvatar({
  user,
}: {
  user: { fullName: string; avatar?: string };
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error?.message || "Logout failed");
      // Even if logout fails on server, redirect to home
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user.avatar} alt={user.fullName} />
          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/user-account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full text-left justify-start h-auto p-2"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
