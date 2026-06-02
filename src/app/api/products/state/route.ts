import { NextResponse } from "next/server";
import prisma from "@/server/db/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      price: true,
      stock: true,
      image: true,
      description: true,
      active: true,
    },
  });

  return NextResponse.json({ products });
}

