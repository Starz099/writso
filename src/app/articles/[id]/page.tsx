"use client";
import Description from "@/app/_components/Description/Description";
import TextEditor from "@/app/_components/TextEditor/TextEditor";
import { Button } from "@/app/_components/ui/button";
import { createArticle } from "@/core/api";

import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Workspace = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [attempt, setAttempt] = useState("");
  const { data: session } = useSession();

  const onChange = (content: string) => {
    setAttempt(content);
  };

  const submitArticle = async () => {
    // console.log("Submitting article", {
    //   id,
    //   attempt,
    //   userEmail: session?.user?.email,
    // });
    try {
      if (!session?.user?.email) {
        alert("You must be logged in to submit an article");
        return;
      }

      await createArticle(attempt, id, session.user.email);
      alert("Article submitted successfully");
    } catch (e) {
      console.error("Error while submitting article", e);
    }
  };

  return (
    <div className="h-[calc(100vh-85px)] w-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={30} className="p-6">
          <Description statementId={id} />
        </Panel>
        <PanelResizeHandle className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400" />
        <Panel defaultSize={60} minSize={30} className="bg-red-50 p-4">
          <div className="relative">
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
};

export default Workspace;
