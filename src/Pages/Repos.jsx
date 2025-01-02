import React, { useState, useEffect } from "react";
import { useGitHub } from "../context/GitHubContext";
import { Card, Button, Input, List, Typography, notification, Space, Pagination, Tag } from "antd";
import { CommentOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const ReposList = () => {
  const { repos } = useGitHub();
  const [comments, setComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(savedComments);
  }, []);

  const handleAddComment = (repoId) => {
    const commentBody = commentInputs[repoId]?.trim();
    if (commentBody) {
      const updatedComments = {
        ...comments,
        [repoId]: [...(comments[repoId] || []), commentBody],
      };
      setComments(updatedComments);
      setCommentInputs((prev) => ({ ...prev, [repoId]: "" }));
      localStorage.setItem("comments", JSON.stringify(updatedComments));
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

  const handleInputChange = (repoId, value) => {
    setCommentInputs((prev) => ({ ...prev, [repoId]: value }));
  };

  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="repos-list max-w-4xl mx-auto">
      <Title level={2} className="font-bold text-center">
        Your Repositories
      </Title>
      <div>
        {currentRepos.length > 0 ? (
          currentRepos.map((repo) => (
            <Card
              key={repo.id}
              title={
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold"
                >
                  {repo.name}
                </a>
              }
              extra={
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View Repo
                </a>
              }
              bordered={false}
              className="mb-5 rounded-lg shadow-lg"
            >
              <div className="mt-2">
                <Tag color={repo.private ? "red" : "green"}>
                  {repo.private ? "Private" : "Public"}
                </Tag>
              </div>

              <div className="comments mt-4">
                <Title level={4} className="font-bold">
                  Comments:
                </Title>
                <List
                  bordered
                  dataSource={comments[repo.id] || []}
                  renderItem={(comment, index) => (
                    <List.Item key={index} className="pl-5">
                      <Text className="text-sm text-gray-800">{comment}</Text>
                    </List.Item>
                  )}
                  className="bg-gray-100 rounded-lg p-3"
                  locale={{ emptyText: "No comments available" }}
                />

                <Space direction="vertical" className="mt-3 w-full">
                  <Input.TextArea
                    placeholder="Add a comment..."
                    className="mt-2 rounded-lg border border-gray-300 text-sm"
                    rows={3}
                    value={commentInputs[repo.id] || ""}
                    onChange={(e) => handleInputChange(repo.id, e.target.value)}
                  />
                  <Button
                    onClick={() => handleAddComment(repo.id)}
                    type="primary"
                    icon={<CommentOutlined />}
                    className="mt-3 bg-green-600 border-green-600 text-sm py-2 px-4 rounded"
                  >
                    Add Comment
                  </Button>
                </Space>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-base text-gray-500">No repositories found.</p>
        )}
      </div>

      <div className="text-center mt-5">
        <Pagination
          current={currentPage}
          total={repos.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="mt-5 inline-block"
        />
      </div>
    </div>
  );
};

export default ReposList;
