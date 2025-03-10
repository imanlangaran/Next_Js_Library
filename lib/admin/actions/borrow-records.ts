'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

export const getBorrowRecords = async () => {
  const records = await db
    .select({
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      bookId: borrowRecords.bookId,
      borrowDate: sql<string>`to_char(${borrowRecords.borrowDate}, 'Mon DD YYYY')`.as("borrowDate"),
      dueDate: sql<string>`to_char(${borrowRecords.dueDate}, 'Mon DD YYYY')`.as("dueDate"),
      returnDate: sql<string>`to_char(${borrowRecords.returnDate}, 'Mon DD YYYY')`.as("returnDate"),
      status: borrowRecords.status,
      bookTitle: books.title,
      bookCoverColor: books.coverColor,
      bookCoverUrl: books.coverUrl,
      userFullName: users.fullName,
      userEmail: users.email,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .leftJoin(users, eq(borrowRecords.userId, users.id));

  return records;
}
