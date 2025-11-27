"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaType } from "@/lib/form-schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting;
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader className="font-bold text-3xl text-center">
        Sign in
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"primary"}
              className="w-full"
              disabled={isPending}
            >
              Login {isPending && <LoaderCircle className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
