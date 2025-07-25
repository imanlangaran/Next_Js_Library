"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { sql, eq, count } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while creating the book",
    };
  }
};

// this is the standard way
export const getBooks = async () => {
  try {
    const allBooks = await db.select().from(books);
    return {
      success: true,
      data: allBooks,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while getting the books",
    };
  }
};

// this is my way
export const getAllBooks = async () => {
  const allBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      createdAt: sql<string>`to_char(${books.createdAt}, 'Mon DD YYYY')`,
    })
    .from(books);
  return allBooks;
};

export const getBookById = async (id: string) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id));
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while getting the book",
    };
  }
};

export const updateBook = async (params: BookParams) => {
  try {
    await db.update(books).set(params).where(eq(books.id, params.id));
    const book = await db.select().from(books).where(eq(books.id, params.id));
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while updating the book",
    };
  }
};

export const deleteBook = async ({id}: {id: string}) => {
  try {
    await db.delete(books).where(eq(books.id, id));
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while deleting the book",
    };
  }
}

export const getBookStats = async () => {
  const totalBooks = await db.select({ count: count() }).from(books);

  // send dummy data
  const teloranceBooks = 2;
  return {
    totalBooks: totalBooks[0].count,
    teloranceBooks,
  };
}
