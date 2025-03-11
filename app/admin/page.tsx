import StatsCard from '@/components/admin/StatsCard'
import React from 'react'
import { getBorrowRequestStats } from '@/lib/admin/actions/borrow-records'
import { getUserStats } from '@/lib/admin/actions/user'
import { getBookStats } from '@/lib/admin/actions/book'
import OverviewCard from '@/components/admin/OverviewCard'

const page = async () => {

  const { totalBorrowRequest, teloranceBorrowRequest } = await getBorrowRequestStats();
  const { totalUsers, teloranceUsers } = await getUserStats();
  const { totalBooks, teloranceBooks } = await getBookStats();

  return (
    <section className='flex flex-col gap-4'>
      <div className='grid grid-cols-3 gap-4'>
        <StatsCard title="Borrowed books" telorance={teloranceBorrowRequest} value={totalBorrowRequest} />
        <StatsCard title="Total Users" telorance={teloranceUsers} value={totalUsers} />
        <StatsCard title="Total Books" telorance={teloranceBooks} value={totalBooks} />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <OverviewCard title="Borrow Requests" bottonLink="/admin/borrow-records" />
        <OverviewCard title="Account Requests" bottonLink="/admin/users" className="row-span-2" />
        <OverviewCard title="Recently Added Books" bottonLink="/admin/books" />
      </div>
    </section>
  )
}

export default page