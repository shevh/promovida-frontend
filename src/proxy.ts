// src/app/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rotas públicas
  if (
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/about")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Redirecionamento por role (se estiver na raiz do private)
  const role = request.cookies.get("role")?.value || "CITIZEN";

  if (pathname === "/private" || pathname === "/private/") {
    if (role === "CITIZEN")
      return NextResponse.redirect(new URL("/private/citizen", request.url));
    if (role === "HEALTH_PROFESSIONAL")
      return NextResponse.redirect(
        new URL("/private/professional", request.url)
      );
    if (role === "MANAGER" || role === "ADMIN")
      return NextResponse.redirect(new URL("/private/manager", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
