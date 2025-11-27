"use client";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface RedirectBtnProps {
  url: string;
  children: ReactNode;
  className?: string;
}

export const RedirectBtn = ({ url, className, children }: RedirectBtnProps) => {
  const router = useRouter();

  const onRedirect = () => {
    router.push(url);
  };

  return (
    <Button className={cn(className)} variant={"primary"} onClick={onRedirect}>
      {children}
    </Button>
  );
};
