import * as z from "zod";
export const ProductSchema = z.object({
  name: z.string().min(3, {
    error: "name can't be less than 3",
  }),
  images: z
    .array(
      z.object({
        imageUrl: z.string(),
      })
    )
    .min(1, {
      error: "Atleast one image required",
    }),
  categoryId: z.string().min(1, {
    error: "select one Category",
  }),
  price: z.number(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
