import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import prisma from "@/server/db/prisma";
import { z } from "zod";

const BodySchema = z.object({
  lines: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(999),
      })
    )
    .default([]),
});

export async function POST(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { lines } = parsed.data;

  // Ensure cart exists
  const cart = await prisma.cart.upsert({
    where: { userId: session.userId },
    update: {},
    create: { userId: session.userId },
    select: { id: true },
  });

  // Upsert cart items
  await prisma.$transaction(async (tx) => {
    // Remove items not in payload
    const productIds = lines.map((l) => l.productId);
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id, ...(productIds.length ? { productId: { notIn: productIds } } : {}) },
    });

    for (const line of lines) {
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: line.productId,
          },
        },
        update: { quantity: line.quantity },
        create: { cartId: cart.id, productId: line.productId, quantity: line.quantity },
      });
    }
  });

  return NextResponse.json({ ok: true });
}

