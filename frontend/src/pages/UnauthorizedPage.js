import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6+

const UnauthorizedPage = () => {
  const navigate = useNavigate(); // Use navigate to programmatically redirect

  const handleGoBack = () => {
    navigate("/"); // Redirect to the home page or login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" paragraph>
          You do not have permission to view this page. Please contact your
          administrator if you believe this is an error.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default UnauthorizedPage;
