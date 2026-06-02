import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import prisma from "@/server/db/prisma";

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      total: true,
      customerName: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ orders });
}

