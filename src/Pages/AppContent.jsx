import React, { useEffect } from "react";
import { useGitHub } from "../context/GitHubContext";
import { useNavigate } from "react-router-dom";
import LoginPage from "../components/Login";

const AppContent = () => {
  const { userLoggedIn, loginWithGitHub, logout } = useGitHub();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  return (
    <div>
      <LoginPage
        userLoggedIn={userLoggedIn}
        onLogin={loginWithGitHub}
        onLogout={logout}
      />
    </div>
  );
};

export default AppContent;
