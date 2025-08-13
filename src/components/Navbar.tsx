"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { ModeToggle } from "./theme-toggle";
import UserAvatar from "./UserAvatar";
import { NavLinkClient } from "@/components/NavLinkClient";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";

export default function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Get auth state and actions from store
  const { user, isAuthenticated, mode, logout } = useAuthStore();
  // Add this near top of component function
  const totalItems = useCartStore((state) => state.totalItems());

  // Hide navbar completely for authenticated kitchen users
  if (isAuthenticated && mode === "kitchen") {
    return null;
  }

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
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          🍽️ Foodie
        </Link>

        {/* Center Navigation (md and up) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/menu" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <Link href="/offers" className="hover:text-primary transition-colors">
            Offers
          </Link>
          {isAuthenticated && mode === "user" && (
            <>
              <Link
                href="/orders"
                className="hover:text-primary transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/track-order"
                className="hover:text-primary transition-colors"
              >
                Track Order
              </Link>
            </>
          )}
        </nav>

        {/* Right Side (lg+) */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Only show cart for regular users */}
          {(!isAuthenticated || mode === "user") && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {isAuthenticated && totalItems > 0 && (
                  <Badge
                    className="absolute -top-0 -right-2 rounded-full px-2 py-0.5 text-xs"
                    variant="destructive"
                  >
                    {useCartStore.getState().totalItems()}
                  </Badge>
                )}
              </Link>
            </Button>
          )}

          {isAuthenticated ? (
            <>{user && <UserAvatar user={user} />}</>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/kitchen/login">Kitchen Login</Link>
              </Button>
            </>
          )}

          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] sm:w-[300px]">
              <div className="mt-4 space-y-4 text-base font-medium">
                <NavLinkClient href="/">Home</NavLinkClient>
                <Separator />
                <NavLinkClient href="/menu">Menu</NavLinkClient>
                <Separator />
                <NavLinkClient href="/offers">Offers</NavLinkClient>

                {isAuthenticated && mode === "user" && (
                  <>
                    <Separator />
                    <NavLinkClient href="/orders">Orders</NavLinkClient>
                    <Separator />
                    <NavLinkClient href="/track-order">
                      Track Order
                    </NavLinkClient>
                  </>
                )}

                {/* Only show cart for regular users */}
                {(!isAuthenticated || mode === "user") && (
                  <>
                    <Separator />
                    <NavLinkClient href="/cart">Cart</NavLinkClient>
                  </>
                )}

                {isAuthenticated ? (
                  <>
                    <Separator />
                    {mode === "user" && (
                      <>
                        <NavLinkClient href="/profile">Profile</NavLinkClient>
                        <Separator />
                      </>
                    )}
                    {mode === "kitchen" && (
                      <>
                        <NavLinkClient href="/kitchen/dashboard">
                          Dashboard
                        </NavLinkClient>
                        <Separator />
                      </>
                    )}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Separator />
                    <NavLinkClient href="/auth/login">Login</NavLinkClient>
                    <Separator />
                    <NavLinkClient href="/kitchen/login">
                      Kitchen Login
                    </NavLinkClient>
                  </>
                )}

                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground mb-1 block">
                    Theme
                  </span>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}