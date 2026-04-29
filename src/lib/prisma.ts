import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const getAdapter = () => {
  const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "./dev.db";
  return new PrismaBetterSqlite3({ url: dbPath });
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: getAdapter(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
