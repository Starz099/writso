"use client";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import axios from "axios";

const CommentBox = (props: { submissionId: string }) => {
  const [content, setContent] = useState("");

  async function handleComment() {
    try {
      await axios.post(`/api/article/${props.submissionId}/comment`, {
        content: content,
      });
    } catch (e) {
      console.log("error adding comment", e);
    }
  }

  return (
    <div className="m-4 flex flex-col gap-4 bg-purple-50 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="enter comment"
          onChange={(e) => setContent(e.target.value)}
        ></Input>
        <Button onClick={handleComment}>Comment</Button>
      </div>
      <div>All Comments</div>
    </div>
  );
};
// TODO: comments should appear from database
export default CommentBox;
