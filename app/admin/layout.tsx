import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

import "@/styles/admin.css";
import SideBar from '@/components/admin/SideBar';
import Header from '@/components/admin/Header';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/database/drizzle';

const Layout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();
  if (!session?.user?.id) redirect('/sign-in');

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  console.log(isAdmin);

  if (!isAdmin) redirect('/')

  return (
    <main className='flex min-h-screen w-full flex-row'>
      <SideBar session={session} />

      <div className='admin-container'>
        <Header session={session} />
        {children}
      </div>
    </main>
  )
}

export default Layout