import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { AlertDlg } from "./AlertDialog";
import { useState } from "react";

interface ActionMenuProps {
  url: string;
  onDelete: VoidFunction;
}
export const ActionMenu = ({ url, onDelete }: ActionMenuProps) => {
  const [isDeleteDlgOpen, setIsDeleteDlgOpen] = useState(false);

  const delelteCategory = async () => {
    await onDelete();
    setIsDeleteDlgOpen(false);
  };
  return (
    <>
      <AlertDlg isOpen={isDeleteDlgOpen} onContinue={delelteCategory} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={url} className="flex items-center gap-x-2">
              <EditIcon size={8} className="mr-1" /> Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleteDlgOpen(true)}
          >
            <Trash size={8} className="mr-1 text-destructive" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
