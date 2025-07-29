"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">🍽️ Foodie</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delicious food delivered to your door. Fresh. Fast. Tasty.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:underline">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:underline">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-5 w-5 hover:text-blue-500 transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-5 w-5 hover:text-foreground transition-colors" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="h-5 w-5 hover:text-blue-700 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Foodie. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
