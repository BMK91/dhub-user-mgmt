import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import { Navigate } from "react-router-dom";

import { logout } from "../actions/AuthActions";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.user?.role); // Get the user's role from Redux

  // Check if the role is valid and allowed
  const isAuthenticated = role && allowedRoles.includes(role);

  // If not authenticated, dispatch logout and redirect to login page
  if (!isAuthenticated) {
    // Dispatch the logout action
    localStorage.removeItem("token");
    dispatch(logout());

    // Redirect to login page (or wherever you'd like)
    return <Navigate to="/login" />;
  }

  // If authenticated, return the children (protected content)
  return children;
};

export default ProtectedRoute;
