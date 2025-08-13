import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ⛔ No token? Redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Decode token
  const decoded = await verifyJwtToken(token);
  if (!decoded || !decoded.role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  // ✅ Role-based access control
  if (pathname.startsWith("/kitchen") && decoded.role !== "kitchen") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && decoded.role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/kitchen/:path*", "/user/:path*"],
};
