import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import TheTable from '@/components/admin/TheTable';
import { ColumnDef } from '@tanstack/react-table';
import { getAllBooks } from '@/lib/admin/actions/book';
import { BooksColumns } from '@/components/admin/columns';

const page = async () => {
  const Allbooks = await getAllBooks();

  return (
    <section className="w-full rounded-2xl bg-white p-7">

    <TheTable
      title="All books"
      columns={BooksColumns}
      data={Allbooks}
      extraButtons={
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className='text-white'>
            + Create a New Book
          </Link>
        </Button>
      }
    />
  </section >
  )
}

export default page