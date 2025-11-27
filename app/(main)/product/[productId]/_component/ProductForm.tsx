"use client";
import { createProduct, updateProduct } from "@/action/product";
import { SubmitBtn } from "@/components/action-btn/SubmitBtn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ProductSchema,
  ProductSchemaType,
} from "@/lib/form-schema/product.schema";
import { Category } from "@/lib/generated/prisma/client";
import { ProductWithImagesAndCategoryStoreType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProductFormProps {
  categories: Category[];
  product: ProductWithImagesAndCategoryStoreType | null;
}
export const ProductForm = ({ categories, product }: ProductFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isUpdating = !!product;
  const defaultValues = isUpdating
    ? {
        name: product.name,
        images: product.images,
        categoryId: product.categoryId,
      }
    : {
        name: "",
        images: [],
        categoryId: "",
        price: 0,
      };
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });

  const handleSubmit = (data: ProductSchemaType) => {
    try {
      startTransition(async () => {
        let res;
        if (isUpdating) {
          res = await updateProduct(product.id, data);
        } else {
          res = await createProduct(data);
        }

        if (!res.success) {
          toast.error(res.error);
          return;
        }
        toast.success(`${data.name} Product Created `);
        form.reset();
        router.push("/product");
      });
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Card>
        <CardHeader className="text-xl text-indigo-900 font-bold">
          {isUpdating ? "Update" : "Create"} Product
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Images<span className="text-destructive">*</span>
                    </FormLabel>

                    <FormControl>
                      <ImageUploader
                        onChange={(url) =>
                          field.onChange([...field.value, { imageUrl: url }])
                        }
                        onRemove={(url) => {
                          field.onChange(
                            field.value.filter(
                              (currentUrl) => currentUrl.imageUrl !== url
                            )
                          );
                        }}
                        images={field.value.map((image) => image.imageUrl)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-8">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your store name.."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Select Category{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                  className="w-full"
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Price
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="price"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <SubmitBtn isPending={isPending} className="w-[150px]">
                  {isUpdating ? "Save" : "Create"}
                </SubmitBtn>
              </div>{" "}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
