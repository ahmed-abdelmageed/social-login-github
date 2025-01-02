import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const LayoutComponent = ({ children, className = "" }) => {
  return (
    <Layout className="bg-gray-100 w-full min-h-screen">
      <Content className={`p-10 bg-white shadow-lg ${className}`}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
