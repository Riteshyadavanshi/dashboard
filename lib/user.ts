import { prisma } from "./db";

export const getUserByEmail = async (email: string) => {
  return await prisma.admin.findUnique({
    where: {
      email,
    },
  });
};
