"use client";
import { createCategory, updateCategory } from "@/action/category";
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
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  CategorySchema,
  CategorySchemaType,
} from "@/lib/form-schema/category.schema";
import { Store } from "@/lib/generated/prisma/client";
import { CategoryWithProductAndStoreType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryFormProps {
  stores: Store[];
  category: CategoryWithProductAndStoreType | null;
}
export const CategoryForm = ({ stores, category }: CategoryFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isUpdating = !!category;
  const defaultValues = isUpdating
    ? {
        name: category.name,
        images: category.images,
        storeId: category.store.id,
      }
    : {
        name: "",
        images: [],
        storeId: "",
      };
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const handleSubmit = (data: CategorySchemaType) => {
    try {
      startTransition(async () => {
        let res;
        if (isUpdating) {
          res = await updateCategory(category.id, data);
        } else {
          res = await createCategory(data);
        }

        if (!res.success) {
          toast.error(res.error);
          return;
        }
        toast.success(`${data.name} Category Created `);
        form.reset();
        router.push("/category");
      });
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Card>
        <CardHeader className="text-xl text-indigo-900 font-bold">
          {isUpdating ? "Update" : "Create"} Category
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
                    name="storeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Select Store{" "}
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
                              {stores.map((store) => (
                                <SelectItem
                                  key={store.id}
                                  value={store.id}
                                  className="w-full"
                                >
                                  {store.name}
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
