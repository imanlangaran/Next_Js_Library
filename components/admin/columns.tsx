"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserWAvatar from "./UserWAvatar";

export const AllUsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => (
      // console.log(row.constructor.name)
      // console.log(row)
      <UserWAvatar 
      name={row.original["fullName"]}
      email={row.getValue("email")}/>
      
    ),
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
  },
  {
    accessorKey: "role",
    header: "Role",
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
