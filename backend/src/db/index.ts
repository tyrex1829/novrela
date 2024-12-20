import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import env from "dotenv";
import { Context } from "hono";
env.config();

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

export function getPrismaClient(c: Context) {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate()) as unknown as PrismaClient;
  }
  return global.cachedPrisma;
}
