import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGitHub } from "../context/GitHubContext";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { userLoggedIn, logout } = useGitHub();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    await navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="text-white text-3xl font-extrabold tracking-wide uppercase hover:text-gray-100 transition duration-300 ease-in-out"
        >
          GitHub
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white text-2xl md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute top-16 left-0 right-0  p-5 flex-col md:flex md:flex-row md:items-center md:static md:space-x-8`}
        >
          {userLoggedIn ? (
            <>
              <Link
                to="/"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out mb-3 md:mb-0"
              >
                Repositories
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out mb-3 md:mb-0"
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
