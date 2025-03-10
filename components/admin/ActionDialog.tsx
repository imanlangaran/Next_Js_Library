import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { GridLoader } from "react-spinners";

interface ActionDialogProps {
  headingTitle: string;
  description: React.ReactNode;
  children: React.ReactNode;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  asChild?: boolean;
  confirmButtonText?: string;
  confirmButtonVarient?: "constructive" | "destructive";
  iconColor1?: string;
  iconColor2?: string;
  value?: string;
  textColor?: string;
}

const ActionDialog = ({
  headingTitle,
  description,
  children,
  onConfirm,
  isLoading = false,
  open,
  onOpenChange,
  asChild,
  confirmButtonText = "Confirm",
  confirmButtonVarient = "constructive",
  iconColor1 = "bg-green-100",
  iconColor2 = "bg-green-500",
  textColor = "text-green-700",
  value,
}: ActionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild={asChild}>
        <div
          className={cn(
            "flex items-center",textColor
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm flex flex-col items-center justify-stretch">
        <div className={cn("w-24 h-24 rounded-full z-1 flex items-center justify-center", iconColor1)}>
          <div
            className={cn(
              "w-3/4 h-3/4 rounded-full z-2 m-auto flex items-center justify-center",
              iconColor2
            )}
          >
            {isLoading ? (
              <GridLoader color="#FFFFFF" size={8} />
            ) : (
              <Info className="w-5/12 h-5/12 text-white" />
            )}
          </div>
        </div>
        <DialogTitle className="font-extrabold ">
          {headingTitle}
        </DialogTitle>
        <div className="font-medium text-center text-balance size">
          {description}
        </div>
        <DialogFooter>
          <div className="w-full flex justify-evenly items-center gap-4">
            <DialogClose asChild>
              <Button variant="secondary" size="lg" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant={confirmButtonVarient}
              size="lg"
              className="w-full"
              onClick={onConfirm}
              disabled={isLoading}
              value={value}
            >
              {isLoading ? (
                <GridLoader color="#FFFFFF" size={8} />
              ) : (
                confirmButtonText
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
