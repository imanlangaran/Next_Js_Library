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
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

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
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          {/* <Button variant='secondary'>{row.getValue("role")}</Button> */}
          <div
            className={`px-3 py-2 rounded-full w-min cursor-pointer ${row.getValue(
              "role") === 'USER' ? "bg-red-200" : "bg-green-200"}`}
          >
            {row.getValue("role")}
          </div>
          {/* <DDOption color={DropDownOptions.user_role[row.getValue('role')]} name={row.getValue('role')}/> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={row.getValue("role")}>
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
    cell: ({ row }) => (
      // <Link
      //   href={`/admin/users/view-id-card${row.getValue("universityIdCard")}`}
      //   className="text-blue-500 hover:text-blue-700 flex items-center"
      // >
      //   View ID Card <SquareArrowOutUpRight width={14} height={14} className="ml-1" />
      // </Link>
      <Dialog>
        <DialogTrigger >
          <div
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            View ID Card <SquareArrowOutUpRight width={14} height={14} className="ml-1" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md h-96">
          <DialogTitle>
            ID Card
          </DialogTitle>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger >
          <div className="text-red-700 flex items-center">
            <Trash2 width={20} height={20} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md h-96">
          <DialogTitle>
            Delete User
          </DialogTitle>
        </DialogContent>
      </Dialog>
    )
  },
];
