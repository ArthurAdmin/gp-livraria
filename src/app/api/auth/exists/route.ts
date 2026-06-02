import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/server/db/prisma";
import { getSession } from "@/server/auth/session";

const QuerySchema = z.object({
  id: z.string().min(1).optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = QuerySchema.safeParse({ id: url.searchParams.get("id") ?? undefined });
  if (!q.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const session = getSession();
  if (!session) return NextResponse.json({ authed: false });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true, email: true },
  });

  return NextResponse.json({
    authed: !!user,
    role: user?.role ?? null,
    userId: user?.id ?? null,
    email: user?.email ?? null,
  });
}

