import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthProvider = async ({ children }: PropsWithChildren) => {
  const user = await auth();

  if (!user?.user) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default AuthProvider;
