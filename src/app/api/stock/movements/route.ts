import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/auth/authorize";
import prisma from "@/server/db/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const movements = await prisma.stockMovement.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      productId: true,
      type: true,
      quantity: true,
      reason: true,
      createdAt: true,
      createdById: true,
      product: { select: { title: true } },
    },
  });

  return NextResponse.json({ movements });
}

