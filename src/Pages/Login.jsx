import React from "react";

const LoginPage = ({ onLogin, userLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg shadow-xl p-8">
        {/* GitHub Logo */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          GitHub Login with Firebase
        </h1>

        {/* Show Login button only if not logged in */}
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
          >
            Login with GitHub
          </button>
      </div>
    </div>
  );
};

export default LoginPage;
