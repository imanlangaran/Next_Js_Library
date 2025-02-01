import ImageKit from "imagekit"
import dummyBooks from "../dummyBooks.json"
import { books } from "./schema"
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({path:'.env.local'});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client:sql})

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,

})

const seed = async () => {
  console.log("seeing data ...")

  try {
    for(const book of dummyBooks){

      console.log("number ",book.id)
      
      const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, '/books/covers') as string;
      console.log("cover uploaded.")
      
      const videoUrl = await uploadToImageKit(book.videoUrl, `${book.title}.mp4`, '/books/videos') as string;
      console.log("video uploaded.")
      
      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl
      })
      console.log("data inserted.")

    }

    console.log("data seeded successfully.")
  } catch (error) {
    console.error("Error seeding data: ", error)
  }
}

const uploadToImageKit = async(coverUrl: string, fileName: string, folder: string) => {
  try {
    const response = await imageKit.upload({file:coverUrl, fileName, folder});

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to imagekit:",error);
  }
}

seed();