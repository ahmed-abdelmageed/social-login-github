import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" role="status">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 border-solid rounded-full animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
