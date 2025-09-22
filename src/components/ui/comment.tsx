import { User } from "@prisma/client";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
  author: User;
  authorId: string;
  parentCommentId?: string;
  replies: Comment[];
}
interface commentUiProps {
  comment: Comment;
}
const CommentUi = ({ comment }: commentUiProps) => {
  const handleReply = async () => {
    try {
      await axios.post(`/api/comment/${comment.id}`, {
        content: "test reply",
      });
    } catch (e) {
      console.log("error while posting reply", e);
    }
  };

  const fn = async () => {
    const replies = (await axios.get(`/api/comment/${comment.id}`)).data;
    console.log(replies);
  };

  return (
    <div>
      <p className="text-gray-800">{comment.content}</p>
      <span className="mt-2 block text-sm text-gray-500">
        — {comment.author.name}
      </span>
      <button onClick={handleReply}>reply</button>
      <button onClick={fn}>get reply</button>
    </div>
  );
};

export default CommentUi;
