import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/auth/authorize";
import prisma from "@/server/db/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const products = await prisma.product.findMany({
    where: { stock: { lte: 5 }, active: true },
    orderBy: { stock: "asc" },
    select: { id: true, title: true, author: true, stock: true, price: true, category: true },
  });

  return NextResponse.json({ products });
}

