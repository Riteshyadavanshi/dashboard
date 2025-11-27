"use client";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SubmitBtnProps {
  isPending: boolean;
  children: ReactNode;
  className?: string;
}
export const SubmitBtn = ({
  isPending,
  children,
  className,
}: SubmitBtnProps) => {
  return (
    <Button className={cn(className)} variant={"primary"}>
      {isPending && <Loader className="animate-spin ml-4" />} {children}
    </Button>
  );
};
