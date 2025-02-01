import { auth, signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import React from 'react'

const page = async () => {

  
    const session = await auth();
  
    const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(books.createdAt)) as Book[];

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className='mb-10'
      >
        <Button>Log out</Button>
      </form>

      <BookList title="Borrowed Books" 
        books={latestBooks.slice(1)} />
    </>
  )
}

export default page