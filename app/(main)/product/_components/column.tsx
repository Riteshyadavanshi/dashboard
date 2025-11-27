"use client";
import { onDeleteProduct } from "@/action/product";
import { ProductWithImagesAndCategoryStoreType } from "@/lib/type";
import { dateFormater } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ActionMenu } from "../../../../components/ActionMenu";
import { IndianRupee } from "lucide-react";

export const ProductColumn: ColumnDef<ProductWithImagesAndCategoryStoreType>[] =
  [
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
      header: "Category",
      cell: ({ row }) => {
        const { category } = row.original;

        return <span>{category.name}</span>;
      },
    },
    {
      header: "Price",
      cell: ({ row }) => {
        const { price } = row.original;

        return (
          <span className="flex items-center">
            {" "}
            <IndianRupee size={14} /> {price}
          </span>
        );
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
          await onDeleteProduct(id);
        };
        return <ActionMenu url={`/product/${id}`} onDelete={onDelete} />;
      },
    },
  ];
