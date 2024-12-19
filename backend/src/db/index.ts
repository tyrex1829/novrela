import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import env from "dotenv";
env.config();

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = new PrismaClient({
  datasourceUrl: process.env.ACCELERATE_DB_URL,
}).$extends(withAccelerate());
