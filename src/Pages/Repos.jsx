import React, { useState, useEffect } from "react";
import { useGitHub } from "../context/GitHubContext";
import {  Typography } from "antd";
import Loading from "../components/Loading";
import RepoCard from "../components/repos-components/RepoCard";
import PaginationComponent from "../components/repos-components/PaginationComponent";

const { Title } = Typography;

const ReposList = () => {
  const { repos, loading } = useGitHub();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="repos-list max-w-4xl mx-auto p-4 bg-gray-50 rounded-md shadow-md">
      <Title level={2} className="text-xl font-bold mb-6">
        Repositories
      </Title>
      <div>
        {currentRepos.length > 0 ? (
          currentRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p className="text-center text-gray-500">No repositories found.</p>
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalItems={repos.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReposList;
