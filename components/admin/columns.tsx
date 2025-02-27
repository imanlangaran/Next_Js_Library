"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserWAvatar from "./UserWAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import DDOption from "./DDOption";
import { DropDownOptions } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Info, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { changeUserRole } from "@/lib/admin/actions/user";

export const AllUsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => (
      // console.log(row.constructor.name)
      // console.log(row)
      <UserWAvatar
        name={row.original["fullName"]}
        email={row.getValue("email")}
      />
    ),
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <Button variant='secondary'>{row.getValue("role")}</Button> */}
          <div
            className={`px-3 py-2 rounded-full w-min cursor-pointer ${
              row.getValue("role") === "USER" ? "bg-red-200" : "bg-green-200"
            }`}
          >
            {row.getValue("role")}
          </div>
          {/* <DDOption color={DropDownOptions.user_role[row.getValue('role')]} name={row.getValue('role')}/> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={row.getValue("role")}
          onValueChange={async (value: string) => {
            await changeUserRole({userId: row.original.id, role: value as "ADMIN" | "USER"});
          }}>
            <DropdownMenuRadioItem value="ADMIN">
              <div
                className={cn(
                  "px-3 py-2 rounded-full w-min cursor-context-menu ",
                  DropDownOptions.user_role.ADMIN
                )}
              >
                ADMIN
              </div>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="USER">
              <div
                className={cn(
                  "px-3 py-2 rounded-full w-min cursor-context-menu ",
                  DropDownOptions.user_role.USER
                )}
              >
                USER
              </div>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          {/* <DropdownMenuLabel>ADMIN</DropdownMenuLabel>
          <DropdownMenuLabel>USER</DropdownMenuLabel> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "borrowedBooks",
    header: "Borrowed books",
  },
  {
    accessorKey: "universityIdNo",
    header: "University ID No",
  },
  {
    accessorKey: "universityIdCard",
    header: "University ID Card",
    cell: ({ row }) => {
      const [loading, setLoading] = useState(false);
      return (
        <Dialog>
          <DialogTrigger>
            <div className="text-blue-500 hover:text-blue-700 flex items-center">
              View ID Card{" "}
              <SquareArrowOutUpRight width={14} height={14} className="ml-1" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md min-h-[350] flex flex-col items-center justify-stretch">
            <DialogTitle className="w-full">ID Card</DialogTitle>
            <div className="flex-grow w-full flex items-center justify-center">
              {loading ? (
                <GridLoader color="#25388C" size={15} />
              ) : (
                <IKImage
                  path={row.getValue("universityIdCard")}
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  alt="University ID Card"
                  width={500}
                  height={300}
                  className="object-cover"
                  onLoad={(e) => {
                    setLoading(false);
                    // console.log(e);
                  }}
                  onLoadStart={(e) => {
                    setLoading(true);
                    // console.log(e);
                  }}
                  lqip={{ active: true }}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger>
          <div className="text-red-700 flex items-center">
            <Trash2 width={20} height={20} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm flex flex-col items-center justify-stretch">
          <div className="w-24 h-24 bg-red-100 rounded-full z-1 flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-red-400 rounded-full z-2 m-auto flex items-center justify-center">
              <Info className="w-5/12 h-5/12 text-white " />
            </div>
          </div>
          <DialogTitle className="font-extrabold ">Delete User</DialogTitle>
          <div className="font-medium text-center text-balance size">
            Are you sure that you want to delete{" "}
            <span className="font-bold">{row.original.fullName} </span>?
          </div>
          <DialogFooter className="mt-4 w-full flex flex-col justify-between items-center">
            <div className="w-full flex justify-evenly items-center gap-4">
              <DialogClose asChild>
                <Button variant="secondary" size="lg" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="destructive" size="lg" className="w-full">
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
];
