import React, { createContext, useState, useContext, useEffect } from "react";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

const GitHubContext = createContext();

export const useGitHub = () => useContext(GitHubContext);



export const GitHubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [githubToken, setGithubToken] = useState(
    localStorage.getItem("githubToken") || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (githubToken) {
      setUserLoggedIn(true);
      fetchRepos(githubToken);
    }
  }, [githubToken]);

  const loginWithGitHub = async () => {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope("repo");
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        setGithubToken(token);
        localStorage.setItem("githubToken", token);
        setUserLoggedIn(true);
        fetchRepos(token);
      } else {
        console.error("GitHub token is missing.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearSession();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchRepos = async (token) => {
    setLoading(true);
    try {
      const response = await fetch("https://api.github.com/user/repos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch repositories");

      const reposData = await response.json();
      setRepos(reposData);
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    setGithubToken(null);
    setUserLoggedIn(false);
    setRepos([]);
    localStorage.removeItem("githubToken");
  };

  return (
    <GitHubContext.Provider
      value={{ repos, userLoggedIn, loginWithGitHub, logout }}
    >
      {loading ? <Loading /> : children}
    </GitHubContext.Provider>
  );
};
