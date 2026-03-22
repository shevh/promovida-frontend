// src/app/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rotas públicas - permite acesso sem autenticação
  if (
    pathname === "/" ||
    pathname.startsWith("/events")
  ) {
    return NextResponse.next();
  }

  // Verifica se tem token de acesso
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Pega o role do cookie (setado no login)
  const role = request.cookies.get("role")?.value || "CITIZEN";

  // Se o usuário acessar /private ou /private/ → redireciona para o dashboard correto
  if (pathname === "/private" || pathname === "/private/") {
    if (role === "CITIZEN") {
      return NextResponse.redirect(new URL("/citizen", request.url));
    }
    if (role === "HEALTH_PROFESSIONAL") {
      return NextResponse.redirect(new URL("/professional", request.url));
    }
    if (role === "MANAGER" || role === "ADMIN") {
      return NextResponse.redirect(new URL("/manager", request.url));
    }
    // Fallback caso role inválido
    return NextResponse.redirect(new URL("/citizen", request.url));
  }

  // Para todas as outras rotas autenticadas, continua normalmente
  // (você pode adicionar mais regras de autorização aqui depois)
  return NextResponse.next();
}

export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)).*)"],
};
