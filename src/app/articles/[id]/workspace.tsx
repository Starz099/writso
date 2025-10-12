"use client";

import Interactions from "@/components/features/articles/Interactions";
import TextEditor from "@/components/features/editor/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createArticle } from "@/lib/api";
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
        session.user.email,
        id,
      );
      alert("Article submitted successfully");
      router.push(currentPath + "/" + article?.id);
    } catch (e) {
      console.error("Error while submitting article", e);
    }
  };

  return (
    <div className="bg-background h-[calc(100vh-85px)] w-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={30} className="overflow-y-auto p-6">
          {description}
          <Interactions statementId={id} />
        </Panel>
        <PanelResizeHandle className="bg-border hover:bg-primary w-1.5 cursor-col-resize transition-colors" />
        <Panel defaultSize={60} minSize={30} className="p-4">
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
            <div className="mt-4 flex justify-end">
              <Button
                className="cursor-pointer"
                onClick={submitArticle}
                disabled={!title || !attempt}
              >
                Submit Article
              </Button>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
