import React from "react";
import { Pagination } from "antd";

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  return (
    <div className="text-center mt-5">
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationComponent;
