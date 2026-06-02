import { getSession } from "@/server/auth/session";
import prisma from "@/server/db/prisma";

export async function getAuthedUser() {


  const session = getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  return user;
}

export async function requireAdmin() {
  const user = await getAuthedUser();
  if (!user) return null;
  if (user.role !== "ADMIN") return null;

  return user;
}

