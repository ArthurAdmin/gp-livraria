import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  phone: z.string().min(6),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  // Endpoint é apenas um wrapper para validar/sanitizar e retornar url.
  // O redirecionamento final continua no client.
  const { phone, message } = parsed.data;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return NextResponse.json({ url });
}

