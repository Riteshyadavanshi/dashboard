"use client";
import { CategoryWithProductAndStoreType } from "@/lib/type";
import { dateFormater } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ActionMenu } from "../../../../components/ActionMenu";
import { onDeleteCategory } from "@/action/category";

export const CategoryColumn: ColumnDef<CategoryWithProductAndStoreType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Image",
    cell: ({ row }) => {
      const { images } = row.original;

      return (
        <Image
          src={images[0].imageUrl}
          alt="image"
          width={200}
          height={200}
          className="size-[50px]"
        />
      );
    },
  },

  {
    header: "Store",
    cell: ({ row }) => {
      const { store } = row.original;

      return <span>{store.name}</span>;
    },
  },
  {
    header: "Created Date",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatedValue = dateFormater(createdAt);
      return <span>{formatedValue}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const onDelete = async () => {
        await onDeleteCategory(id);
      };
      return <ActionMenu url={`/category/${id}`} onDelete={onDelete} />;
    },
  },
];
