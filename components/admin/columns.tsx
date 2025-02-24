"use client";

import { ColumnDef } from "@tanstack/react-table";

export const AllUsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center text-blue-100">{row.getValue("email")}</div>
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
