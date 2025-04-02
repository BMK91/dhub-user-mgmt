import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/AuthActions";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {}, []);

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Clear the user data from Redux
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {user.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserProfilePage;
