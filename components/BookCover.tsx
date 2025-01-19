import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "./BookCoverSVG";

type BookCoverVaiant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const varientStyles: Record<BookCoverVaiant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  varient?: BookCoverVaiant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  varient = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        varientStyles[varient],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className=" absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
