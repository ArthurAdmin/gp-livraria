import { NextResponse } from "next/server";
import prisma from "@/server/db/prisma";
import { getSession } from "@/server/auth/session";

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ user });
}

