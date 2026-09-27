import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/stats/:path*", "/stats"],
};

export function proxy(req: NextRequest) {
  const user = process.env.STATS_USER;
  const pass = process.env.STATS_PASSWORD;

  // Si no hay credenciales configuradas, no bloquear (evita lockout accidental).
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const [u, p] = atob(auth.slice(6)).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="dp-stats"' },
  });
}
