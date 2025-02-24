import Table from '@/components/admin/Table';
import { AllUsersColumns } from '@/constants/columns';
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import React from 'react'

const AllUsers = async () => {

  const AllUsers = await getAllUsers();


  return (
    <section className='admin-main p-7'>
       <Table title="All Users" columns={AllUsersColumns} data={AllUsers}/>


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