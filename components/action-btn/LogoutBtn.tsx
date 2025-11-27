"use client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export const LogoutBtn = () => {
    
  const onLogOut = async () => {
    await signOut({
      redirect: true,
      redirectTo: "/login",
    });
  };
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="cursor-pointer"
      onClick={onLogOut}
    >
      <LogOut />
    </Button>
  );
};
