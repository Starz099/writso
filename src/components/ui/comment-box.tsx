"use client";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import axios from "axios";
import { User } from "@prisma/client";
import CommentUi from "./comment";

interface Comment {
  id: string;
  content: string;
  author: User;
  authorId: string;
  parentCommentId?: string;
  replies: Comment[];
}

const CommentBox = (props: { submissionId: string }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  async function handleComment() {
    try {
      await axios.post(`/api/article/${props.submissionId}/comment`, {
        content: content,
      });
    } catch (e) {
      console.log("error adding comment", e);
    }
  }

  useEffect(() => {
    async function getComments() {
      try {
        const cmnts = (
          await axios.get<{ comments: Comment[] }>(
            `/api/article/${props.submissionId}/comment`,
          )
        ).data;
        setComments(cmnts.comments.reverse());
      } catch (e) {
        console.log("error adding comment", e);
      }
    }

    getComments();
  }, [props.submissionId]);
  return (
    <div className="m-4 flex flex-col gap-4 bg-purple-50 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="enter comment"
          onChange={(e) => setContent(e.target.value)}
        ></Input>
        <Button onClick={handleComment}>Comment</Button>
      </div>
      <div>
        {comments.map((comment, key) => {
          return (
            <div
              key={key}
              className="mb-3 rounded-lg border border-purple-200 bg-white p-4 shadow-sm"
            >
              <CommentUi comment={comment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentBox;
