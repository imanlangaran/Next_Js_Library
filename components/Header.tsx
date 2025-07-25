"use client";

import { cn, getInitial } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signOut } from "@/auth";



const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40}></Image>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {/* <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li> */}

        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitial(session?.user?.name || "OO")}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className='mb-10'
          >
            <Button>Log out</Button>
          </form> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
