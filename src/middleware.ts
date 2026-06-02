import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Observação: middleware não pode usar Prisma/crypto (Edge runtime).
// Admin authorization deve ser feita nos endpoints /admin/ via requireAdmin().

export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


