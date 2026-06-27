import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Aquí está la magia: Le pasamos la configuración que nos exige
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
