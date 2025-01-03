import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGitHub } from "../context/GitHubContext";

const Navbar = () => {
  const { userLoggedIn, logout } = useGitHub();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await navigate("/login"); // This is async and should be handled accordingly
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-white text-2xl font-bold">
          GitHub Firebase
        </Link>
        <div className="flex items-center space-x-4">
          {userLoggedIn ? (
            <>
              <Link to="/" className="text-white hover:text-gray-300">
                Repositories
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
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
