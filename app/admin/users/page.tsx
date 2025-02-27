import TheTable from "@/components/admin/TheTable";
import { AllUsersColumns } from "@/components/admin/columns";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sql } from "drizzle-orm";
import React from "react";

const AllUsers = async () => {
  const AllUsers = await getAllUsers();

  return (
    <section className="admin-main p-7">
      <TheTable title="All Users" columns={AllUsersColumns} data={AllUsers} />
    </section>
  );
};

const getAllUsers = async () => {
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      joinedDate: sql<string>`to_char(${users.createdAt}, 'Mon DD YYYY')`,
      role: users.role,
      borrowedBooks: sql<number>`2`,
      universityIdNo: users.universityId,
      universityIdCard: users.universityCard,
    })
    .from(users)
    .orderBy(users.createdAt);

  return allUsers;
};

export default AllUsers;
