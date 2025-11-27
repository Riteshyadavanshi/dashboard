"use client";
import { User } from "@/lib/generated/prisma/client";
import { dateFormater } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const UserColumn: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    header: "Created Date",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatedValue = dateFormater(createdAt);
      return <span>{formatedValue}</span>;
    },
  },
];
