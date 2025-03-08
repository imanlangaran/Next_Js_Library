import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/admin/actions/book";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const book = await getBookById(id);
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...book} />
      </section>
    </>
  );
};

export default page;
