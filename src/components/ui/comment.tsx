"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface Author {
  id: string;
  name: string | null;
  email: string | null;
}

interface Comment {
  id: string;
  content: string;
  author?: Author; // author can be absent if not included by API
  authorId: string;
  parentCommentId?: string | null;
  replies?: Comment[];
}

interface CommentUiProps {
  comment: Comment;
}

const CommentUi = ({ comment }: CommentUiProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [postingReply, setPostingReply] = useState(false);

  const fetchReplies = async () => {
    try {
      setLoadingReplies(true);
      const res = await axios.get<{ replies: Comment[] }>(
        `/api/comment/${comment.id}`,
      );
      setReplies(res.data.replies || []);
    } catch (e) {
      console.log("error while fetching replies", e);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleToggleReplies = async () => {
    if (!expanded) {
      await fetchReplies();
    }
    setExpanded((v) => !v);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    try {
      setPostingReply(true);
      await axios.post(`/api/comment/${comment.id}`, {
        content: replyContent.trim(),
      });
      setReplyContent("");
      setShowReplyInput(false);
      // Refresh replies so the new one shows up with author info
      if (!expanded) setExpanded(true);
      await fetchReplies();
    } catch (e) {
      console.log("error while posting reply", e);
    } finally {
      setPostingReply(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-gray-800">{comment.content}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          — {comment.author?.name || "Anonymous"}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyInput((v) => !v)}
            aria-label="Reply to comment"
          >
            Reply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleReplies}
            aria-expanded={expanded}
            aria-label="Toggle replies"
          >
            <span
              className={`mr-1 inline-block transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              ▼
            </span>
            Replies
          </Button>
        </div>
      </div>

      {showReplyInput && (
        <div className="mt-2 flex items-center gap-2">
          <Input
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button
            size="sm"
            onClick={handleReplySubmit}
            disabled={postingReply || !replyContent.trim()}
          >
            {postingReply ? "Posting..." : "Submit"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowReplyInput(false);
              setReplyContent("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {expanded && (
        <div className="mt-3 space-y-3 border-l border-purple-200 pl-3">
          {loadingReplies ? (
            <div className="text-sm text-gray-500">Loading replies...</div>
          ) : replies.length === 0 ? (
            <div className="text-sm text-gray-500">No replies yet</div>
          ) : (
            replies.map((r) => (
              <div key={r.id} className="rounded-md bg-purple-50 p-3">
                <CommentUi comment={r} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentUi;
