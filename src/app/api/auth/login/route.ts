import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



import { z } from "zod";
import prisma from "@/server/db/prisma";
import { createSession } from "@/server/auth/session";

const BodySchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(72),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  createSession(user.id);
  return NextResponse.json({ ok: true, role: user.role });
}

