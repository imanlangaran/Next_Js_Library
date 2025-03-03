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
  fullName: string;
  children: React.ReactNode;
  varient?: "green" | "red" | "blue";
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  asChild?: boolean;
}

const ActionDialog = ({
  fullName,
  children,
  varient = "green",
  onConfirm,
  isLoading = false,
  open,
  onOpenChange,
  asChild
}: ActionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild={asChild}>
        <div
          className={cn(
            "flex items-center",
            varient === "green" ? "text-green-700 " : varient === "red" ? "text-red-700" : "text-blue-700"
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm flex flex-col items-center justify-stretch">
        <div className={cn("w-24 h-24 rounded-full z-1 flex items-center justify-center", varient === "green" ? "bg-green-200 " : varient === "red" ? "bg-red-100" : "bg-blue-100")}>
          <div
            className={cn(
              "w-3/4 h-3/4 rounded-full z-2 m-auto flex items-center justify-center",
              varient === "green" ? "bg-green-500 " : varient === "red" ? "bg-red-400" : "bg-blue-400"
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
          {varient === "green" ? "Approve User" : "Delete User"}
        </DialogTitle>
        <div className="font-medium text-center text-balance size">
          Are you sure that you want to 
          {varient === "green" ? " approve " : " delete "}
          <span className="font-bold">{fullName} </span>?
        </div>
        <DialogFooter>
          <div className="w-full flex justify-evenly items-center gap-4">
            <DialogClose asChild>
              <Button variant="secondary" size="lg" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              variant={varient==='green' ? 'constructive' :'destructive'} 
              size="lg" 
              className="w-full"
              onClick={onConfirm}
              value={varient === "green" ? "approve" : "reject"}
              disabled={isLoading}
            >
              {isLoading ? (
                <GridLoader color="#FFFFFF" size={8} />
              ) : (
                varient === "green" ? "Approve" : "Delete"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
