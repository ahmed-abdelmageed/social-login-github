import React, { useEffect, useState } from "react";
import { List, Typography } from "antd";

const { Text, Title } = Typography;

const CommentList = ({ repoId, comments }) => {
  const [storedComments, setStoredComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setStoredComments(savedComments[repoId] || []);
  }, [repoId]);

  return (
    <div className="comments mt-4">
      <Title level={5} className="text-gray-700">
        Comments
      </Title>
      <List
        bordered
        dataSource={[...storedComments, ...comments]}
        renderItem={(comment, index) => (
          <List.Item key={index}>
            <Text className="text-gray-800">{comment}</Text>
          </List.Item>
        )}
        className="bg-gray-100 rounded-md p-2"
        locale={{ emptyText: "No comments yet" }}
      />
    </div>
  );
};

export default CommentList;
