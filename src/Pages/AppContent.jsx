// AppContent.js
import React, { useEffect } from "react";
import { useGitHub } from "../context/GitHubContext";
import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";

const AppContent = () => {
    const { userLoggedIn, loginWithGitHub, logout } = useGitHub();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userLoggedIn) {
            navigate("/");
        }
        if (userLoggedIn) {
            navigate("/repos");
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