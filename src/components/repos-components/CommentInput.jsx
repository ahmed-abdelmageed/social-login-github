import React, { useState } from "react";
import { Input, Button, Space, notification } from "antd";

const CommentInput = ({ repoId, onAddComment }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    const commentBody = commentInput.trim();
    if (commentBody) {
      const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
      const updatedComments = {
        ...savedComments,
        [repoId]: [...(savedComments[repoId] || []), commentBody],
      };

      localStorage.setItem("comments", JSON.stringify(updatedComments));
      setCommentInput("");
      onAddComment(commentBody); 
      notification.success({
        message: "Comment Added",
        description: "Your comment has been added successfully!",
      });
    } else {
      notification.error({
        message: "Error",
        description: "Comment body is required.",
      });
    }
  };

  return (
    <Space direction="vertical" className="mt-3 w-full">
      <Input.TextArea
        placeholder="Write a comment..."
        rows={2}
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        className="rounded-md border-gray-300"
      />
      <Button
        onClick={handleAddComment}
        type="primary"
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Add Comment
      </Button>
    </Space>
  );
};

export default CommentInput;
