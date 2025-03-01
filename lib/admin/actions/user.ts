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
    await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while changing the role",
    };
  }
}


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
    .orderBy(users.createdAt);

  return allUsers;
};