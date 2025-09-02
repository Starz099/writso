"use client";

import Dashboard from "@/app/_components/Home/Dashboard";
import { Button } from "@/app/_components/ui/button";
import { signIn, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Dashboard />
      ) : (
        <div className="mt-40 flex flex-col items-center justify-center gap-12 text-6xl">
          Write, Save, Share your thoughts
          <br />
          <Button size="lg" className="cursor-pointer" onClick={() => signIn()}>
            Login to Start Writing
          </Button>
        </div>
      )}
    </>
  );
}
