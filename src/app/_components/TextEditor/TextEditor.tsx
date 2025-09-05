"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TextEditor = ({content, onChange}: TextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "bg-teal-100 p-2 border-2 h-145 rounded-xl overflow-scroll focus:outline-none",
      },
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML());
    }
  });
  return<div className="">
   <EditorContent editor={editor} />
  </div>
};

export default TextEditor;
