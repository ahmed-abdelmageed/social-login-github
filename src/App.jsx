import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { GitHubProvider } from "./context/GitHubContext";
import AppContent from "./Pages/AppContent";
import ReposList from "./Pages/Repos";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import Navbar from "./components/Navbar ";

const App = () => (
  <GitHubProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<AppContent />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ReposList />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </GitHubProvider>
);

export default App;
