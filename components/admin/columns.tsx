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
import {
  CirclePlus,
  Eye,
  Info,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
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
import ActionDialog from "./ActionDialog";

type TableMeta = {
  updateData: (user: User) => void;
};

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
    cell: ({ row, table }) => {
      const handleRoleChange = async (newRole: "ADMIN" | "USER") => {
        const result = await changeUserRole({
          userId: row.original.id,
          role: newRole,
        });

        if (result.success && result.user) {
          // Update table data with new user info
          (table.options.meta as TableMeta)?.updateData(result.user);
        }
      };
      return (
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
            <DropdownMenuRadioGroup
              value={row.getValue("role")}
              onValueChange={async (value: string) => {
                await handleRoleChange(value as "ADMIN" | "USER");
              }}
            >
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
      );
    },
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
      <ActionDialog fullName={row.original.fullName} varient="red" onConfirm={(e) => {console.log()}}>
        <Trash2 width={20} height={20} />
      </ActionDialog>
    ),
  },
];




export const AccountRequestsColumns: ColumnDef<AccountRequest>[] = [
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => (
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
              <Eye width={14} height={14} className="mr-1" />
              View ID Card
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
    header: "Actions",
    cell: ({ row }) => {
      interface ActionEvent extends React.MouseEvent<HTMLButtonElement> {
        target: HTMLButtonElement;
      }

      const handleAction = async (e: ActionEvent): Promise<void> => {
        console.log(e.target.value);
      };

      return (
        <div className="flex gap-4 items-center">
          <ActionDialog
            fullName={row.original.fullName}
            varient="green"
            onConfirm={handleAction}
          >
            <Button className="bg-green-200 text-green-900 hover:bg-green-200/80 ">
              Approve
            </Button>
          </ActionDialog>
          <ActionDialog
            fullName={row.original.fullName}
            varient="red"
            onConfirm={handleAction}
          >
            <CirclePlus width={20} height={20} className="rotate-45" />
          </ActionDialog>
        </div>
      );
    },
  },
];

export const AccountRequestsColumns2: ColumnDef<AccountRequest>[] = [
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => (
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
              <Eye width={14} height={14} className="mr-1" />
              View ID Card
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
    header: "Actions",
    cell: ({ row }) => {
      interface ActionEvent extends React.MouseEvent<HTMLButtonElement> {
        target: HTMLButtonElement;
      }

      const handleAction = async (e: ActionEvent): Promise<void> => {
        console.log(e.target.value);
      };

      return (
        <div className="flex gap-4 items-center">
          <ActionDialog
            fullName={row.original.fullName}
            varient="green"
            onConfirm={handleAction}
          >
            <Button className="bg-green-200 text-green-900 hover:bg-green-200/80 ">
              Approve
            </Button>
          </ActionDialog>
          <ActionDialog
            fullName={row.original.fullName}
            varient="red"
            onConfirm={handleAction}
          >
            <CirclePlus width={20} height={20} className="rotate-45" />
          </ActionDialog>
        </div>
      );
    },
  },
];
