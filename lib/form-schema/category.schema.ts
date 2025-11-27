import * as z from "zod";
export const CategorySchema = z.object({
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
  storeId: z.string().min(1, {
    error: "select one store",
  }),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
