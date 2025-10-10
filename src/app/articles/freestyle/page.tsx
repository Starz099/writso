"use client";

import TextEditor from "@/components/features/editor/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createArticle } from "@/lib/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Workspace() {
  const [attempt, setAttempt] = useState("");
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const currentPath = process.env.NEXT_PUBLIC_APP_URL + usePathname();

  const onChange = (content: string) => {
    setAttempt(content);
  };

  const submitArticle = async () => {
    try {
      if (!session?.user?.email) {
        alert("You must be logged in to submit an article");
        return;
      }
      const article = await createArticle(title, attempt, session.user.email);
      alert("Article submitted successfully");
      console.log("Article submitted successfully", article);
      router.push(currentPath + "/" + article?.id);
    } catch (e) {
      console.error("Error while submitting article", e);
    }
  };

  return (
    <div className="bg-background h-[calc(100vh-85px)] w-full">
      <div className="flex h-full flex-col">
        <Input
          placeholder="Enter your title here..."
          className="mb-4 border-0 px-2 text-2xl font-bold tracking-tighter shadow-none focus-visible:ring-0"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="flex-grow">
          <TextEditor content={attempt} onChange={onChange} />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-4 px-4">
            <Button>
              <Link href="/articles/freestyle/all_submissions">
                All Submissions
              </Link>
            </Button>
            <Button>
              <Link href="/articles/freestyle/my_submissions">
                My Submissions
              </Link>
            </Button>
          </div>

          <Button
            className="cursor-pointer"
            onClick={submitArticle}
            disabled={!title || !attempt}
          >
            Submit Article
          </Button>
        </div>
      </div>
    </div>
  );
}
