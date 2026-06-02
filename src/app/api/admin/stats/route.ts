import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/auth/authorize";
import prisma from "@/server/db/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const totalProducts = await prisma.product.count();
  const lowStockProducts = await prisma.product.count({ where: { stock: { lte: 5 } } });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const ordersThisMonth = await prisma.order.count({
    where: { createdAt: { gte: startOfMonth } },
  });

  const revenueAgg = await prisma.order.aggregate({
    _sum: { total: true },
    where: { createdAt: { gte: startOfMonth } },
  });

  // produtos mais vendidos (somando OrderItem.quantity)
  const topSelling = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });

  const topSellingProducts = await Promise.all(
    topSelling.map(async (row: { productId: string; _sum: { quantity: number | null } }) => {
      const product = await prisma.product.findUnique({ where: { id: row.productId } });
      return {
        productId: row.productId,
        title: product?.title ?? "Produto",
        quantity: row._sum.quantity ?? 0,
      };
    })
  );


  return NextResponse.json({
    totalProducts,
    lowStockProducts,
    ordersThisMonth,
    revenueThisMonth: revenueAgg._sum.total ?? 0,
    topSelling: topSellingProducts,
  });
}

