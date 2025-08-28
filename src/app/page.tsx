"use client";

import Dashboard from "@/components/Home/Dashboard";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
    {
      session ? (
        <Dashboard />
      ) : (
        <div className="mt-40 flex flex-col gap-12 items-center justify-center text-6xl">
          Write, Save, Share your thoughts
          <br/>
          <Button size="lg" className="cursor-pointer" onClick={() => signIn()}>Login to Start Writing</Button>
        </div>
      )
    }
    </>
  );
}