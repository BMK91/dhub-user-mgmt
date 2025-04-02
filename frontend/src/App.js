import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Use Routes instead of Switch

import theme from "./config/theme";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "moderator"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Redirect to login if no route matches */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
