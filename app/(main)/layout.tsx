import SidebarWrapper from "@/components/sidebar/sidebarwrapper";
import AuthProvider from "@/providers/AuthProvider";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <div className=" flex min-w-screen min-h-screen  bg-white">
        <div className="flex-[20%] w-full   p-4">
          <SidebarWrapper />
        </div>
        <div className="flex-[80%] p-4 bg-gray-100 shadow">{children}</div>
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
