'use server';

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { sql } from "drizzle-orm";

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
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while creating the book",
    }
  }
}


// this is the standard way 
export const getBooks = async () => {
  try {
    const allBooks = await db.select().from(books);
    return {
      success: true,
      data: allBooks,
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error accurred while getting the books",
    }
  }
}

// this is my way
export const getAllBooks = async () => {
  const allBooks = await db.select({
    id: books.id,
    title: books.title,
    author: books.author,
    genre: books.genre,
    rating: books.rating,
    coverUrl: books.coverUrl,
    coverColor: books.coverColor,
    createdAt: sql<string>`to_char(${books.createdAt}, 'Mon DD YYYY')`,
  }).from(books);
  return allBooks;
}
