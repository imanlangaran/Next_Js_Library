"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { count, eq, lte, sql } from "drizzle-orm";

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
      status: users.status,
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
      status: users.status,
      role: users.role,
      borrowedBooks: sql<number>`0`
    }
  )
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(users.createdAt);

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

export const rejectUser = async ({id}: {id: string}) => {
  try {
    await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      error: "An error occurred while rejecting the user",
    };
  }
}

export const deleteUser = async ({id}: {id: string}) => {
  try {
    await db.delete(users).where(eq(users.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while deleting the user",
    };
  }
}

export const getUserStats = async () => {
  // Commented out database queries for now
  const totalUsers = await db.select({ count: count() }).from(users).where(eq(users.status, "APPROVED"));
  // const teloranceUsers = await db.select({ count: count() }).from(users).where(lte(users.createdAt, new Date()));

  // send dummy data
  const teloranceUsers = -2;

  return {
    totalUsers: totalUsers[0].count,
    teloranceUsers
  };
}

