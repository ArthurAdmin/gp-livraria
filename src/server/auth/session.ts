import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "gp_session";

export type SessionPayload = {
  userId: string;
};

function encode(payload: SessionPayload) {
  const raw = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return raw;
}

function decode(value: string): SessionPayload | null {
  try {
    const raw = Buffer.from(value, "base64url").toString("utf8");
    const obj = JSON.parse(raw);
    if (!obj?.userId || typeof obj.userId !== "string") return null;
    return { userId: obj.userId };
  } catch {
    return null;
  }
}

export function createSession(userId: string) {
  const secret = process.env.AUTH_SECRET ?? "";
  if (!secret) throw new Error("AUTH_SECRET not set");

  const payload = encode({ userId });
  const sig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  cookies().set(COOKIE_NAME, `${payload}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function destroySession() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getSession(): SessionPayload | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return null;

  const secret = process.env.AUTH_SECRET ?? "";
  if (!secret) return null;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }

  return decode(payload);
}

