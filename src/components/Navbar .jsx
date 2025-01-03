import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGitHub } from "../context/GitHubContext";

const Navbar = () => {
  const { userLoggedIn, logout } = useGitHub();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await navigate("/login"); 
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 shadow-lg sticky top-0 z-10 mb-5">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="text-white text-3xl font-extrabold tracking-wide uppercase hover:text-gray-100 transition duration-300 ease-in-out"
        >
          GitHub Firebase
        </Link>
        <div className="flex items-center space-x-8">
          {userLoggedIn ? (
            <>
              <Link
                to="/"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Repositories
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
