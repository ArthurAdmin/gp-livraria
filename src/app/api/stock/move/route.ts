import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/server/auth/authorize";
import prisma from "@/server/db/prisma";

const BodySchema = z.object({
  productId: z.string().min(1),
  type: z.enum(["IN", "OUT"]),
  quantity: z.number().int().min(1).max(9999),
  reason: z.string().min(2).max(300),
});

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { productId, type, quantity, reason } = parsed.data;

  try {
    const res = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId }, select: { id: true, stock: true } });
      if (!product) throw new Error("Produto não encontrado");

      if (type === "OUT" && product.stock < quantity) {
        throw new Error("Estoque insuficiente");
      }

      const nextStock = type === "IN" ? product.stock + quantity : product.stock - quantity;

      await tx.product.update({ where: { id: productId }, data: { stock: nextStock } });

      const movement = await tx.stockMovement.create({
        data: {
          productId,
          type,
          quantity,
          reason,
          createdById: admin.id,
        },
        select: { id: true },
      });

      return movement;
    });

    return NextResponse.json({ ok: true, id: res.id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Falha" }, { status: 409 });
  }
}

