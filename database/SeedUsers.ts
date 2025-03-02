import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import dummyUsers from "../dummyUsers.json";
import { users } from "./schema";

config({path:'.env.local'});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client:sql});

const seedUsers = async () => {
  console.log("seeding users data ...");

  try {
    for(const user of dummyUsers) {
      console.log("inserting user:", user.fullName);
      await db.insert(users).values({
        ...user
      });
      
      console.log("user data inserted.");
    }

    console.log("users data seeded successfully.");
  } catch (error) {
    console.error("Error seeding users data: ", error);
  }
}

seedUsers();

