"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-between rounded-full border-b-2 border-fuchsia-800 px-6 py-2">
      <div className="font-mono text-2xl font-bold">
        <Link href="/">Writso</Link>
      </div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              width={35}
              height={35}
              alt="Sign Out"
              src={session.user?.image as string}
              className="cursor-pointer rounded-full"
            ></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button className="cursor-pointer" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
