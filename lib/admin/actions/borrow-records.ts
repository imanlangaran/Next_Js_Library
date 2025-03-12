'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { count, eq, lte, sql } from "drizzle-orm";

type BorrowRecordData = {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  status: 'BORROWED' | 'RETURNED';
  bookTitle: string;
  bookCoverColor: string;
  bookCoverUrl: string;
  userFullName: string;
  userEmail: string;
}

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

  return records as BorrowRecordData[];
}

export const updateBorrowRecordStatus = async ({ id, status }: { id: string, status: 'BORROWED' | 'RETURNED' }) => {
  try {
    await db.update(borrowRecords).set({ status }).where(eq(borrowRecords.id, id));

    const updatedBorrowRecord = await db.select({
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
    }).from(borrowRecords).leftJoin(books, eq(borrowRecords.bookId, books.id)).leftJoin(users, eq(borrowRecords.userId, users.id)).where(eq(borrowRecords.id, id));

    return {
      success: true,
      data: updatedBorrowRecord[0] as BorrowRecordData,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Failed to update borrow record status",
    };
  }
}

export const getBorrowRequestStats = async () => {
  // Commented out database queries for now
  const totalBorrowRequest = await db.select({ count: count() }).from(borrowRecords).where(eq(borrowRecords.status, "BORROWED"));
  // const teloranceBorrowRequest = await db.select({ count: count() }).from(borrowRecords).where(lte(borrowRecords.dueDate, new Date()));

  // send dummy data
  const teloranceBorrowRequest = 2;

  return {
    totalBorrowRequest: totalBorrowRequest[0].count,
    teloranceBorrowRequest,
  };
}

