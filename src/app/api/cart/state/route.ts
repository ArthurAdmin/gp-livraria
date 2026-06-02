import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import prisma from "@/server/db/prisma";

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ cart: null });

  const cart = await prisma.cart.findUnique({
    where: { userId: session.userId },
    select: {
      items: {
        select: {
          productId: true,
          quantity: true,
        },
      },
    },
  });

  return NextResponse.json({
    cart: cart
      ? {
          items: cart.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }
      : { items: [] },
  });
}

