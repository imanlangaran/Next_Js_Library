import { BorrowRecordsColumns } from '@/components/admin/columns';
import TheTable from '@/components/admin/TheTable'
import { getBorrowRecords } from '@/lib/admin/actions/borrow-records';
import React from 'react'

const page = async () => {
  const BorrowRecords = await getBorrowRecords();
  return (
    <section className="admin-main p-7">
      <TheTable
        title="Borrow Book Requests"
        columns={BorrowRecordsColumns}
        data={BorrowRecords}
      />
    </section>
  )
}

export default page