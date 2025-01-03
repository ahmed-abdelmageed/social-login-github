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
import Navbar from "./components/Navbar ";
import ReposList from "./Pages/Repos";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import themeConfig from "./themeConfig";
import NotFound from "./Pages/NotFound";

const App = () => (
  <ConfigProvider theme={themeConfig}>
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
  </ConfigProvider>
);

export default App;
