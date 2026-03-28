import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Return a proxy that won't crash during build without DATABASE_URL
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (prop === "then" || prop === "$connect" || prop === "$disconnect") {
          return undefined;
        }
        // Return a chainable proxy for any model access
        const handler: ProxyHandler<object> = {
          get: () => () => Promise.resolve(null),
          apply: () => Promise.resolve(null),
        };
        return new Proxy(() => {}, handler);
      },
    });
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
