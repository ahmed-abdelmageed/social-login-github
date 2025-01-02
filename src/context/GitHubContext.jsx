import React, { createContext, useState, useContext, useEffect } from "react";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [githubToken, setGithubToken] = useState(null);

  // Load token and fetch repos on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem("githubToken");
    if (storedToken) {
      setGithubToken(storedToken);
      setUserLoggedIn(true);
      fetchGitHubRepos(storedToken, 10);
    }
  }, []);

  // GitHub Login Function
  const loginWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        setGithubToken(token);
        setUserLoggedIn(true);
        localStorage.setItem("githubToken", token); // Store token in local storage
        await fetchGitHubRepos(token, 10);
      } else {
        console.error("GitHub token is missing.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      setRepos([]);
      setUserLoggedIn(false);
      setGithubToken(null);
      localStorage.removeItem("githubToken"); // Clear token from local storage

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch GitHub Repositories
  const fetchGitHubRepos = async (token, perPage) => {
    let page = 1;
    let allRepos = [];
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("GitHub Error:", errorData);
          throw new Error("Failed to fetch repositories");
        }

        const repos = await response.json();
        allRepos = [...allRepos, ...repos];

        const linkHeader = response.headers.get("Link");
        hasNextPage = linkHeader && linkHeader.includes('rel="next"');
        if (hasNextPage) page++;
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        break;
      }
    }

    setRepos(allRepos);
  };

  return (
    <GitHubContext.Provider
      value={{
        userLoggedIn,
        repos,
        loginWithGitHub,
        logout,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = () => {
  return useContext(GitHubContext);
};
