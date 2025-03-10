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
  PenLine,
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
import {
  ApproveUser,
  changeUserRole,
  rejectUser,
  getAccountRequestData,
  deleteUser,
  getAllUsers,
} from "@/lib/admin/actions/user";
import ActionDialog from "./ActionDialog";
import { toast } from "@/hooks/use-toast";
import { PropagateLoader, ScaleLoader } from "react-spinners";
import BookCover from "./BookCover";
import { deleteBook, getAllBooks } from "@/lib/admin/actions/book";

type BookListData = {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  createdAt: string;
};

type AccountRequestData = {
  id: string;
  email: string;
  fullName: string;
  joinedDate: string;
  universityIdNo: number;
  universityIdCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  role: "ADMIN" | "USER";
  borrowedBooks: number;
};

type BorrowRecordData = {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string | null;
  userFullName: string | null;
  userEmail: string | null;
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  status: 'BORROWED' | 'RETURNED';
  bookCoverColor: string | null;
  bookCoverUrl: string | null;
};

type TableMeta<T extends User | AccountRequestData | BookListData | BorrowRecordData> = {
  updateData: (data: T[]) => void;
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
      const [loading, setLoading] = useState(false);
      const handleRoleChange = async (newRole: "ADMIN" | "USER") => {
        setLoading(true);
        try {
          const result = await changeUserRole({
            userId: row.original.id,
            role: newRole,
          });

          if (result.success && result.user) {
            // Update table data with new user info
            (table.options.meta as TableMeta<User>)?.updateData([result.user]);
            toast({
              title: "Success",
              description: "Role changed successfully",
            });
            setLoading(false);
          }
        } catch (error) {
          toast({
            title: "Error",
            description:
              error instanceof Error ? error.message : "Failed to change role",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={loading}>
            <div
              className={`px-3 py-2 rounded-full w-min cursor-pointer flex items-center justify-center ${row.getValue("role") === "USER" ? "bg-red-200" : "bg-green-200"
                }`}
            >
              {loading ? (
                <ScaleLoader height={10} color={row.getValue("role") === "USER" ? "#7f1d1d" : "#14532d"} />
              ) : (
                row.getValue("role")
              )}
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
    cell: ({ row, table }) => {
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const [deleteLoading, setDeleteLoading] = useState(false);
      return (
        <ActionDialog
          onConfirm={async (e) => {
            setDeleteLoading(true);
            const result = await deleteUser({ id: row.original.id });
            if (result.success) {
              toast({
                title: "Success",
                description: "User deleted successfully",
              });
              setDeleteDialogOpen(false);
              const updatedData = await getAllUsers();
              (table.options.meta as TableMeta<User>)?.updateData(updatedData);
            }
          }}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          isLoading={deleteLoading}
          headingTitle="Delete User"
          description={
            <>
              Are you sure you want to delete{" "}
              <span className="font-bold">{row.original.fullName}</span>?
            </>
          }
          confirmButtonText="Delete"
          iconColor1="bg-red-200"
          iconColor2="bg-red-600"
          textColor="text-red-700"
          confirmButtonVarient="destructive"
        >
          <Trash2 width={20} height={20} />
        </ActionDialog>
      );
    },
  },
];

export const AccountRequestsColumns: ColumnDef<AccountRequestData>[] = [
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
    cell: ({ row, table }) => {
      const [isApproveLoading, setIsApproveLoading] = useState(false);
      const [isRejectLoading, setIsRejectLoading] = useState(false);
      const [approveDialogOpen, setApproveDialogOpen] = useState(false);
      const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

      const handleAction = async (
        e: React.MouseEvent<HTMLButtonElement>
      ): Promise<void> => {
        const target = e.target as HTMLButtonElement;
        const isApprove = target.value === "approve";
        const setLoading = isApprove ? setIsApproveLoading : setIsRejectLoading;
        const setOpen = isApprove ? setApproveDialogOpen : setRejectDialogOpen;

        // console.log(target.value);
        setLoading(true);
        try {
          const result = isApprove
            ? await ApproveUser({ id: row.original.id })
            : await rejectUser({ id: row.original.id });

          // Fetch fresh data and update table
          const updatedData = await getAccountRequestData();
          (table.options.meta as TableMeta<AccountRequestData>)?.updateData(updatedData);

          toast({
            title: "Success",
            description: isApprove
              ? "User approved successfully"
              : "User rejected successfully",
          });

          setOpen(false);
        } catch (error) {
          toast({
            title: "Error",
            description:
              error instanceof Error
                ? error.message
                : `Failed to ${target.value} user`,
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex gap-4 items-center">
          <ActionDialog
            onConfirm={handleAction}
            isLoading={isApproveLoading}
            open={approveDialogOpen}
            onOpenChange={setApproveDialogOpen}
            headingTitle="Approve User"
            value="approve"
            description={
              <>
                Are you sure you want to approve{" "}
                <span className="font-bold">
                  {row.original.fullName}
                </span>
                ?
              </>
            }
            confirmButtonText="Approve"
            iconColor1="bg-green-200"
            iconColor2="bg-green-500"
            textColor="text-green-700"
            confirmButtonVarient="constructive"
          >
            <div className="h-9 px-4 py-2 text-primary-foreground shadow bg-green-200 text-green-900 hover:bg-green-200/80  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              Approve
            </div>
          </ActionDialog>
          <ActionDialog
            onConfirm={handleAction}
            isLoading={isRejectLoading}
            open={rejectDialogOpen}
            onOpenChange={setRejectDialogOpen}
            headingTitle="Reject User"
            description={
              <>
                Are you sure you want to reject{" "}
                <span className="font-bold">
                  {row.original.fullName}
                </span>
                ?
              </>
            }
            confirmButtonText="Reject"
            iconColor1="bg-red-200"
            iconColor2="bg-red-600"
            textColor="text-red-700"
            confirmButtonVarient="destructive"
            value="reject"
          >
            <CirclePlus width={20} height={20} className="rotate-45" />
          </ActionDialog>
        </div>
      );
    },
  },
];

export const BooksColumns: ColumnDef<BookListData>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookCover
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
          varient="extraSmall"
        />
        <p className="text-sm font-medium">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row, table }) => {
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const [deleteLoading, setDeleteLoading] = useState(false);
      return (
        <div className="flex gap-4">
          {/* <ActionDialog
          fullName={row.original.title}
          varient="blue"
          onConfirm={(e) => {
            // Handle edit action
            console.log("Edit book:", row.original.id);
          }}
          asChild
        >
            <PenLine className="h-4 w-4 cursor-pointer" />
        </ActionDialog> */}
          <Link href={`/admin/books/${row.original.id}`}>
            <PenLine className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-700" />
          </Link>
          <ActionDialog
            headingTitle="Delete Book"
            description={
              <>
                Are you sure you want to delete{" "}
                <span className="font-bold">{row.original.title}</span>?
              </>
            }
            confirmButtonText="Delete"
            iconColor1="bg-red-200"
            iconColor2="bg-red-600"
            textColor="text-red-700"
            confirmButtonVarient="destructive"
            onConfirm={async (e) => {
              setDeleteLoading(true);
              const result = await deleteBook({ id: row.original.id });
              if (result.success) {
                toast({
                  title: "Success",
                  description: "Book deleted successfully",
                });
                setDeleteDialogOpen(false);
                const updatedData = await getAllBooks();
                (table.options.meta as TableMeta<BookListData>)?.updateData(updatedData);
              }
            }}
            asChild
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            isLoading={deleteLoading}
          >
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </ActionDialog>
        </div>
      )
    },
  },
];

export const BorrowRecordsColumns: ColumnDef<BorrowRecordData>[] = [
  {
    accessorKey: "bookTitle",
    header: "Book",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookCover
          coverColor={row.original.bookCoverColor || ''}
          coverImage={row.original.bookCoverUrl || ''}
          varient="extraSmall"
        />
        <p className="text-sm font-medium">{row.original.bookTitle || 'Untitled'}</p>
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User Requested",
    cell: ({ row }) => (
      <UserWAvatar
        name={row.original.userFullName || 'Unknown User'}
        email={row.original.userEmail || ''}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Borrow Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as 'BORROWED' | 'RETURNED';
      return (
        <span className={`capitalize ${
          status === 'RETURNED' ? 'text-green-500' : 'text-blue-500'
        }`}>
          {status.toLowerCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "borrowDate",
    header: "Borrowed Date",
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
];

