import React, { useState } from "react";
import { Card, Tag } from "antd";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

const RepoCard = ({ repo }) => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <Card
      title={
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:underline"
        >
          {repo.name}
        </a>
      }
      extra={
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          View
        </a>
      }
      bordered={false}
      className="mb-5 rounded-lg border border-gray-200 shadow-sm"
    >
      <Tag
        color={repo.private ? "red" : "green"}
        className="text-sm px-2 py-1 rounded-md"
      >
        {repo.private ? "Private" : "Public"}
      </Tag>
      <CommentList repoId={repo.id} comments={comments} />
      <CommentInput repoId={repo.id} onAddComment={handleAddComment} />
    </Card>
  );
};

export default RepoCard;
