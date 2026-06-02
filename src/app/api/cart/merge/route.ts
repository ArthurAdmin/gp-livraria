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

// Mescla carrinho do usuário (no banco) com payload
export async function POST(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { lines } = parsed.data;

  const cart = await prisma.cart.upsert({
    where: { userId: session.userId },
    update: {},
    create: { userId: session.userId },
    select: { id: true },
  });

  await prisma.$transaction(async (tx) => {
    for (const line of lines) {
      const existing = await tx.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId: line.productId } },
      });

      if (existing) {
        await tx.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId: line.productId } },
          data: { quantity: existing.quantity + line.quantity },
        });
      } else {
        await tx.cartItem.create({
          data: { cartId: cart.id, productId: line.productId, quantity: line.quantity },
        });
      }
    }

    // opcional: remover itens zerados - aqui não aplicamos porque payload só tem quantidade >= 1
  });

  return NextResponse.json({ ok: true });
}

