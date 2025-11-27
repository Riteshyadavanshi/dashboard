"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarLinkProps {
  icon: ReactNode;
  label: string;
  url: string;
}
export const SidebarLink = ({ icon, label, url }: SidebarLinkProps) => {
  const activePath = usePathname();

  const isActive = activePath === url;
  return (
    <div
      className={cn("w-full p-2", isActive ? "bg-indigo-100 rounded-md" : "")}
    >
      <Link href={url} className="flex items-center gap-x-2">
        {icon}
        <span className="text-gray-500 font-semibold hover:text-indigo-500">
          {label}
        </span>
      </Link>
    </div>
  );
};
