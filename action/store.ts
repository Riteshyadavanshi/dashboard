"use server";

import { prisma } from "@/lib/db";
import { StoreSchema, StoreSchemaType } from "@/lib/form-schema/store.schema";
import { revalidatePath } from "next/cache";

export const createStore = async (data: StoreSchemaType) => {
  try {
    const isValidData = StoreSchema.safeParse(data);
    const { name } = data;
    if (!isValidData.success) {
      return { success: false, error: "Invalid Data" };
    }

    const isCategory = await prisma.store.findFirst({
      where: {
        name,
      },
    });

    if (isCategory) {
      return { success: false, error: "Store exist with this name" };
    }

    await prisma.store.create({
      data: {
        name,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
