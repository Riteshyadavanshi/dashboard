import * as z from "zod";

export const StoreSchema = z.object({
  name: z
    .string()
    .min(5, {
      error: "name can't be less than 5 character",
    })
    .max(20, {
      error: "name can't be more than 20 character",
    }),
});

export type StoreSchemaType = z.infer<typeof StoreSchema>;
