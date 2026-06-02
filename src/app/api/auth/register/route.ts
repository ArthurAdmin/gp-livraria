import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/server/db/prisma";
import { createSession } from "@/server/auth/session";
import bcrypt from "bcrypt";

// TS helper: bcrypt não vem com types no projeto (evita erro TS7006/implicit any)






const BodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(180),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);


  const user = await prisma.user.create({

    data: {
      name,
      email,
      passwordHash,
      role: "CUSTOMER",
    },
    select: { id: true, email: true, name: true, role: true },
  });

  await createSession(user.id);


  return NextResponse.json({ ok: true });
}

