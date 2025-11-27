"use client";

import { createStore } from "@/action/store";
import { StoreSchema, StoreSchemaType } from "@/lib/form-schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SubmitBtn } from "./action-btn/SubmitBtn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export const AddStoreDlg = () => {
  const [isAdding, startTransition] = useTransition();
  const form = useForm<StoreSchemaType>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: StoreSchemaType) => {
    try {
      startTransition(async () => {
        const res = await createStore(data);
        if (!res?.success) {
          toast.error(res?.error);
          return;
        }
        toast.success("New store created successfully");
        form.reset();
      });
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-indigo-900 text-xl">
          Add Store
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                      disabled={isAdding}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4 space-x-4">
              <DialogClose>Cancel</DialogClose>
              <SubmitBtn isPending={isAdding} className="">
                Add
              </SubmitBtn>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
