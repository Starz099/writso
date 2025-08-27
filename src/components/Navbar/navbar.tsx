"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full justify-between rounded-full border-b-2 border-fuchsia-800 px-6 py-2">
      <div className="font-mono font-bold">Writso</div>
      {session ? (
        <button className="cursor-pointer" onClick={() => signOut()}>
          Sign out
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
