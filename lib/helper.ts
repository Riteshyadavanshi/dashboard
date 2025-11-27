import { prisma } from "./db";

export const getAllStores = async () => {
  return await prisma.store.findMany();
};

export const getAllCategory = async () => {
  return await prisma.category.findMany();
};

export const getAllCategoryWithProductStore = async () => {
  return await prisma.category.findMany({
    include: {
      images: true,
      store: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      images: true,
      store: true,
    },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      images: true,
      category: true,
    },
  });
};

export const getAllProductWithImagesAndCategoryStore = async () => {
  return await prisma.product.findMany({
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStoreWithChildrenById = async (id: string) => {
  return await prisma.store.findFirst({
    where: {
      id,
    },
    include: {
      category: {
        include: {
          products: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
};
