import "server-only";
import { prisma } from "@/prisma/db";

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: { email: string; password: string }) {
    return prisma.user.create({
      data,
      select: { id: true, email: true },
    });
  },
};
