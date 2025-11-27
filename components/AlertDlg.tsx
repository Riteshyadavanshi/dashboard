import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface AlertDlgProps {
  message?: string;
  onAccept: VoidFunction;
  isDlgOpen: boolean;
  onChange: (state: boolean) => void;
}
export const AlertDlg = ({
  message = "Are you sure ?",
  onAccept,
  isDlgOpen,
  onChange,
}: AlertDlgProps) => {
  const onClose = () => {
    onChange(false);
  };
  return (
    <Dialog open={isDlgOpen}>
      <DialogContent>
        <DialogHeader className="text-xl">{message}</DialogHeader>
        <DialogFooter className="flex justify-end gap-x-4">
          <Button variant={"destructive"}>Continue</Button>
          <Button variant={"outline"} onClick={onClose}>
            cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
