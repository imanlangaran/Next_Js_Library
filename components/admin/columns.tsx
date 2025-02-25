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
            className={cn(
              "px-3 py-2 rounded-full w-min cursor-pointer",
              DropDownOptions.user_role[row.getValue("role")]
            )}
          >
            {row.getValue("role")}
          </div>
          {/* <DDOption color={DropDownOptions.user_role[row.getValue('role')]} name={row.getValue('role')}/> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuRadioGroup value={row.getValue("role")}>
            <DropdownMenuRadioItem value="ADMIN">
              <div
                className={cn(
                  "px-3 py-2 rounded-full w-min cursor-context-menu",
                  DropDownOptions.user_role.ADMIN
                )}
              >
                ADMIN
              </div>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="USER">
              <div
                className={cn(
                  "px-3 py-2 rounded-full w-min cursor-context-menu",
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
  },
  {
    accessorKey: "actions",
    header: "Action",
  },
];
