// components/NavLinkClient.tsx
"use client";

import Link from "next/link";

export function NavLinkClient({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={() => document.body.click()}>
      {children}
    </Link>
  );
}
