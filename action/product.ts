"use server";

import { prisma } from "@/lib/db";
import {
  ProductSchema,
  ProductSchemaType,
} from "@/lib/form-schema/product.schema";

import { revalidatePath } from "next/cache";

export const createProduct = async (data: ProductSchemaType) => {
  try {
    const isValidData = ProductSchema.safeParse(data);

    const { name, categoryId, images, price } = data;

    if (!isValidData.success) {
      return { success: false, error: "Invalid Data" };
    }

    const isProduct = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (isProduct) {
      return { success: false, error: "Product exist with this name" };
    }

    await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        images: {
          create: images.map((image) => ({ imageUrl: image.imageUrl })),
        },
      },
    });

    revalidatePath("/product");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const updateProduct = async (id: string, data: ProductSchemaType) => {
  try {
    const isValidData = ProductSchema.safeParse(data);

    const { name, categoryId, images, price } = data;
    if (!isValidData.success) {
      return { success: false, error: "Invalid Data" };
    }

    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        categoryId,
        price,
        images: {
          create: images.map((image) => ({ imageUrl: image.imageUrl })),
        },
      },
    });

    revalidatePath("/product");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const onDeleteProduct = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Id is required");
    }
    await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/product");
  } catch {
    console.log("something went wrong ");
  }
};
