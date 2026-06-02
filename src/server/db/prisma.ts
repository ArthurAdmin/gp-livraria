// PrismaClient só fica totalmente tipado quando o Prisma Client é gerado.
// Enquanto isso (ex.: prisma generate ainda não rodou), mantemos fallback para evitar quebrar o build.
// Quando você executar `prisma generate`, os tipos voltam a funcionar.
let PrismaClientCtor: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("@prisma/client");
  PrismaClientCtor = mod?.PrismaClient;
} catch {
  PrismaClientCtor = null;
}

declare global {
  // eslint-disable-next-line no-var
  var __prisma: any | undefined;
}

const prisma =
  global.__prisma ??
  (PrismaClientCtor
    ? new PrismaClientCtor({
        log:
          process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      })
    : null);

export default prisma;

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;


