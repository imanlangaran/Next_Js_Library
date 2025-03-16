import React from "react";
import BookCover from "../BookCover";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitial } from "@/lib/utils";

interface Props {
  bookTitle: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
  borrowDate: string;
  userId?: string;
  userFullName?: string;
}

const BookOverview = ({
  bookTitle,
  author,
  genre,
  coverUrl,
  coverColor,
  borrowDate,
  userId,
  userFullName,
}: Props) => {
  return (
    <div className="w-full p-4 my-2 flex items-center gap-4 bg-slate-100 rounded-xl">
      <BookCover
        coverColor={coverColor}
        coverImage={coverUrl}
        varient="small"
      />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-lg font-medium text-dark-500">{bookTitle}</h3>
        <p className="text-sm text-slate-500">
          {"By " + author + " ⦁ " + genre}
        </p>
        <div className="flex items-center">
          {userId && (
            <div className="flex items-center gap-1">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-amber-100 text-xs">
                  {getInitial(userFullName || "OO")}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-slate-500 mr-4">{userFullName}</p>
            </div>
          )}
          <Image
            src="/icons/admin/calendar.svg"
            alt="Calendar"
            className="inline-block w-4 h-4 mr-1"
            width={10}
            height={10}
          />
          <p className="text-sm text-slate-500">{borrowDate}</p>
        </div>
      </div>
      {userId && (
        <div className="rounded-xl bg-white p-2 mb-auto shadow-md">
          <Eye size={24} />
        </div>
      )}
    </div>
  );
};

export default BookOverview;
