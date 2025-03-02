"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

interface ChangeUserRoleParams {
  userId: string;
  role: "ADMIN" | "USER";
}

export const changeUserRole = async (params: ChangeUserRoleParams) => {
  const { userId, role } = params;

  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));

    // Get the updated user data
    const updatedUser = await db
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
      .where(eq(users.id, userId))
      .limit(1);

    return {
      success: true,
      user: updatedUser[0],
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while changing the role",
    };
  }
};

export const getAllUsers = async () => {
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
    .where(eq(users.status, "APPROVED"))
    .orderBy(users.createdAt);

  return allUsers;
};

export const getAccountRequestData = async () => {
  const requests = await db
    .select(
      {
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      joinedDate: sql<string>`to_char(${users.createdAt}, 'Mon DD YYYY')`,
      universityIdNo: users.universityId,
      universityIdCard: users.universityCard,
    }
  )
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(users.createdAt);

    // console.log(requests.at(0));

  return requests;
};

export const ApproveUser = async ({id}: {id: string}) => {
  try {
    await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      error: "An error occurred while approving the user",
    };
  }
}