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

interface ActionDialogProps {
  fullName: string;
  children: React.ReactNode;
  varient: "green" | "red";
}

const ActionDialog = ({
  fullName,
  children,
  varient = "green",
}: ActionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "flex items-center",
            varient === "green" ? "text-green-700 " : "text-red-700"
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm flex flex-col items-center justify-stretch">
        <div className={cn("w-24 h-24 rounded-full z-1 flex items-center justify-center", varient === "green" ? "bg-green-200 " : "bg-red-100")}>
          <div
            className={cn(
              "w-3/4 h-3/4 rounded-full z-2 m-auto flex items-center justify-center",
              varient === "green" ? "bg-green-500 " : "bg-red-400"
            )}
          >
            <Info className="w-5/12 h-5/12 text-white " />
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
        <DialogFooter className="mt-4 w-full flex flex-col justify-between items-center">
          <div className="w-full flex justify-evenly items-center gap-4">
            <DialogClose asChild>
              <Button variant="secondary" size="lg" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button variant={varient==='green' ? 'constructive' :'destructive'} size="lg" className="w-full">
              {varient === "green" ? "Approve" : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
