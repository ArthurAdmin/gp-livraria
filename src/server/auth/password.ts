import crypto from "crypto";

// Placeholder hash/compare implementation.
// Objetivo: manter backend funcionando SOMENTE até a dependência bcrypt ser instalada.
// Quando bcrypt estiver disponível, substituir por bcrypt.hash/bcrypt.compare.
//
// Formato: pbkdf2$<iterations>$<saltBase64>$<hashBase64>
const ITERATIONS = 150_000;
const KEYLEN = 32;
const DIGEST = "sha256";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);
  return `pbkdf2$${ITERATIONS}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  try {
    const parts = passwordHash.split("$");
    if (parts.length !== 4) return false;
    const [prefix, itStr, saltB64, hashB64] = parts;
    if (prefix !== "pbkdf2") return false;
    const iterations = Number(itStr);
    if (!Number.isFinite(iterations) || iterations <= 0) return false;

    const salt = Buffer.from(saltB64, "base64");
    const expected = Buffer.from(hashB64, "base64");
    const actual = crypto.pbkdf2Sync(password, salt, iterations, expected.length, DIGEST);
    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

