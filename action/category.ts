"use server";

import { prisma } from "@/lib/db";
import {
  CategorySchema,
  CategorySchemaType,
} from "@/lib/form-schema/category.schema";

import { revalidatePath } from "next/cache";

export const createCategory = async (data: CategorySchemaType) => {
  try {
    const isValidData = CategorySchema.safeParse(data);

    const { name, storeId, images } = data;
    if (!isValidData.success) {
      return { success: false, error: "Invalid Data" };
    }

    const isCategory = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (isCategory) {
      return { success: false, error: "Category exist with this name" };
    }

    await prisma.category.create({
      data: {
        name,
        storeId,
        images: {
          create: images.map((image) => ({ imageUrl: image.imageUrl })),
        },
      },
    });

    revalidatePath("/category");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const updateCategory = async (id: string, data: CategorySchemaType) => {
  try {
    const isValidData = CategorySchema.safeParse(data);

    const { name, storeId, images } = data;
    if (!isValidData.success) {
      return { success: false, error: "Invalid Data" };
    }

    await prisma.image.deleteMany({
      where: {
        categoryId: id,
      },
    });

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        storeId,
        images: {
          create: images.map((image) => ({ imageUrl: image.imageUrl })),
        },
      },
    });

    revalidatePath("/category");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const onDeleteCategory = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Id is required");
    }
    await prisma.category.delete({
      where: {
        id,
      },
    });
    revalidatePath("/category");
  } catch {
    console.log("something went wrong ");
  }
};
