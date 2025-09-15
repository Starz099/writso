"use client";

import Interactions from "@/app/_components/Description/Interactions";
import TextEditor from "@/app/_components/TextEditor/TextEditor";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { createArticle } from "@/core/api";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Workspace({
  description,
  id,
}: {
  description: React.ReactNode;
  id: string;
}) {
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
      const article = await createArticle(
        title,
        attempt,
        id,
        session.user.email,
      );
      alert("Article submitted successfully");
      router.push(currentPath + "/" + article?.id);
    } catch (e) {
      console.error("Error while submitting article", e);
    }
  };

  return (
    <div className="h-[calc(100vh-85px)] w-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={30} className="p-6">
          {description}
          <Interactions statementId = {id} />
        </Panel>
        <PanelResizeHandle className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400" />
        <Panel defaultSize={60} minSize={30} className="bg-red-50 p-4">
          <div className="relative">
            <Input
              placeholder="Title"
              className="mb-2 border-4 font-bold"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextEditor content={attempt} onChange={onChange} />
            <Button
              className="absolute right-0 mt-2 cursor-pointer"
              onClick={submitArticle}
            >
              Submit
            </Button>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
