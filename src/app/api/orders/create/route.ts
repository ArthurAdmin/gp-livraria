import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/server/db/prisma";
import { getSession } from "@/server/auth/session";

// NOTE: checkout da UI por enquanto é WhatsApp (criação de pedido + redução de estoque).

const LineSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(999),
});

const BodySchema = z.object({
  lines: z.array(LineSchema).min(1),
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email().max(254),
  customerPhone: z.string().min(8).max(30).optional().default(""),
  deliveryAddress: z.string().min(5).max(500),
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

  const { lines, customerName, customerEmail, customerPhone, deliveryAddress } = parsed.data;

  try {
    // Transação garante consistência de estoque/pedido
    const result = await prisma.$transaction(async (tx) => {
      // 1) Carrega produtos + valida ativo + estoque
      const productIds = lines.map((l) => l.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds }, active: true },
      });


      const productMap = new Map(products.map((p) => [p.id, p] as const));

      for (const line of lines) {
        const p = productMap.get(line.productId);
        if (!p) throw new Error(`Produto indisponível: ${line.productId}`);
        if (p.stock < line.quantity) {
          throw new Error(`Estoque insuficiente para: ${p.title}`);
        }
      }

      // 2) Calcula total
      const total = products.reduce((acc, p) => {
        const line = lines.find((l) => l.productId === p.id);
        if (!line) return acc;
        return acc + Number(p.price) * line.quantity;
      }, 0);

      // 3) Cria pedido
      const order = await tx.order.create({
        data: {
          userId: session.userId,
          total,
          status: "PENDING",
          customerName,
          customerEmail,
          customerPhone: customerPhone ?? "",
          deliveryAddress,
        },
        select: { id: true },
      });

      // 4) Cria order items e reduz estoque
      for (const line of lines) {
        const p = productMap.get(line.productId)!;

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: p.id,
            title: p.title,
            price: p.price,
            quantity: line.quantity,
          },
        });

        await tx.product.update({
          where: { id: p.id },
          data: {
            stock: { decrement: line.quantity },
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: p.id,
            type: "OUT",
            quantity: line.quantity,
            reason: `Pedido ${order.id}`,
            createdById: session.userId,
          },
        });
      }

      return { orderId: order.id };
    });

    // Payload para montagem do WhatsApp (via backend)
    const createdOrderId = result.orderId;

    const orderWithItems = (await prisma.order.findUnique({
      where: { id: createdOrderId },
      select: {
        id: true,
        total: true,
        customerName: true,
        customerPhone: true,
        items: {
          select: {
            productId: true,
            title: true,
            price: true,
            quantity: true,
          },
        },
      },
    })) as any;

    return NextResponse.json({
      ok: true,
      orderId: createdOrderId,
      whatsapp: orderWithItems
        ? {
            phone: orderWithItems.customerPhone ?? "",
            total: orderWithItems.total,
            customerName: orderWithItems.customerName,
            items: orderWithItems.items,
          }
        : null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Falha ao criar pedido";
    return NextResponse.json({ error: msg }, { status: 409 });
  }
}

