import { Button } from "antd";
import React from "react";

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-40 h-40 bg-purple-400 opacity-30 rounded-full absolute top-10 left-20 animate-float"></div>
        <div className="w-64 h-64 bg-pink-400 opacity-20 rounded-full absolute bottom-10 right-20 animate-float-slow"></div>
        <div className="w-32 h-32 bg-indigo-400 opacity-40 rounded-full absolute bottom-40 left-10 animate-float"></div>
      </div>

      <div className="relative bg-white w-96 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub Logo"
            className="w-24 h-24 animate-swing"
          />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Welcome to GitHub
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Sign in to explore your repositories.
        </p>

        <button
          onClick={onLogin}
          type="primary"
          size="large"
          className="w-full h-14 text-xl font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-8 h-8 mr-3"
            />
            Login with GitHub
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
