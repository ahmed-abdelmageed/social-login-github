import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GitHubProvider, useGitHub } from "./context/GitHubContext";
import AppContent from "./Pages/AppContent";
import ReposList from "./Pages/Repos";
import Navbar from "./Pages/Navbar ";

const App = () => {
  return (
    <GitHubProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} /> 
          <Route path="/repos" element={<ReposListWithNavbar />} /> 
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </GitHubProvider>
  );
};

const ReposListWithNavbar = () => {
  const { userLoggedIn } = useGitHub();

  return (
    <>
      {userLoggedIn && <Navbar />} 
      <ReposList />
    </>
  );
};

export default App;
