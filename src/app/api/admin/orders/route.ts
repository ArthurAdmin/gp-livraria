import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/auth/authorize";
import prisma from "@/server/db/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      total: true,
      customerName: true,
      customerEmail: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ orders });
}

