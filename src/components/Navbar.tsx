import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import UserAvatar from "./UserAvatar";
import { NavLinkClient } from "@/components/NavLinkClient";

export default async function Navbar() {
  const isLoggedIn = false;

  const user = isLoggedIn
    ? {
        name: "Rohit",
        avatar:
          "https://plus.unsplash.com/premium_photo-1665664652337-2deaf3f6218e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    : null;

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
          {isLoggedIn && (
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
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {isLoggedIn ? (
            user && <UserAvatar user={user} />
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

                {isLoggedIn && (
                  <>
                    <Separator />
                    <NavLinkClient href="/orders">Orders</NavLinkClient>
                    <Separator />
                    <NavLinkClient href="/track-order">
                      Track Order
                    </NavLinkClient>
                  </>
                )}

                <Separator />
                <NavLinkClient href="/cart">Cart</NavLinkClient>

                {isLoggedIn ? (
                  <>
                    <Separator />
                    <NavLinkClient href="/account">Account</NavLinkClient>
                    <Separator />
                    <form action="/logout" method="POST">
                      <Button
                        variant="destructive"
                        type="submit"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Separator />
                    <NavLinkClient href="/auth/login">Login</NavLinkClient>
                    <Separator />
                    <NavLinkClient href="/kitchen-login">
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
