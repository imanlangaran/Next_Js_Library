import UsersTable from '@/components/admin/UsersTable';
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import React from 'react'

const AllUsers = async () => {

  const AllUsers = await getAllUsers();


  return (
    <section className='admin-main p-7'>
      <div className='flex justify-between items-center'>
        <h2>All Users</h2>
        <button className='btn-primary'>A-Z</button>
      </div>

      <UsersTable />


    </section>
  )
}

const getAllUsers = async () => {
  return await db
    .select()
    .from(users)
    .orderBy(users.createdAt);
}

export default AllUsers