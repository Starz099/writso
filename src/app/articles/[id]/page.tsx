"use client";
import Description from "@/app/_components/Description/Description";
import TextEditor from "@/app/_components/TextEditor/TextEditor";
import { use } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Workspace = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  return (
    <div className="h-[calc(100vh-85px)] w-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={30} className="px-6 py-6">
          <Description statementId={id} />
        </Panel>
        <PanelResizeHandle className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400" />
        <Panel defaultSize={60} minSize={30}>
          <TextEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Workspace;
