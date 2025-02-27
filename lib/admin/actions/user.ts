"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

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