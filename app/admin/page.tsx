import StatsCard from "@/components/admin/StatsCard";
import React from "react";
import {
  getBorrowRecords,
  getBorrowRequestStats,
} from "@/lib/admin/actions/borrow-records";
import { getUserStats } from "@/lib/admin/actions/user";
import { getBookStats } from "@/lib/admin/actions/book";
import OverviewCard from "@/components/admin/OverviewCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBooks } from "@/lib/admin/actions/book";
import BookOverview from "@/components/admin/BookOverview";
const page = async () => {
  const { totalBorrowRequest, teloranceBorrowRequest } =
    await getBorrowRequestStats();
  const { totalUsers, teloranceUsers } = await getUserStats();
  const { totalBooks, teloranceBooks } = await getBookStats();

  const borrowRecords = await getBorrowRecords();
  const { data: books } = await getBooks();

  return (
    <section className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-3 gap-4 ">
        <StatsCard
          title="Borrowed books"
          telorance={teloranceBorrowRequest}
          value={totalBorrowRequest}
        />
        <StatsCard
          title="Total Users"
          telorance={teloranceUsers}
          value={totalUsers}
        />
        <StatsCard
          title="Total Books"
          telorance={teloranceBooks}
          value={totalBooks}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <OverviewCard
          title="Borrow Requests"
          bottonLink="/admin/borrow-records"
        >
          <ScrollArea>
            {borrowRecords.map((record) => (
              <BookOverview key={record.id} {...record} />
            ))}
          </ScrollArea>
        </OverviewCard>
        <OverviewCard
          title="Account Requests"
          bottonLink="/admin/users"
        >
          <>the table</>
        </OverviewCard>
        <OverviewCard title="Recently Added Books" bottonLink="/admin/books">
          <ScrollArea className="max-h-full">
            <div className="flex flex-col gap-4 max-h-full">
              {books?.map((book) => <div key={book.id}>{book.title}</div>)}
            </div>
          </ScrollArea>
        </OverviewCard>
      </div>
    </section>
  );
};

export default page;
