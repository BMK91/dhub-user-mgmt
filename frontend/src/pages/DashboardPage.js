import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/AuthActions";
import { setUsers } from "../actions/UserActions";
import UserTable from "../components/UserTable";
import api from "../config/axiosConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);

  // Default empty array
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      fetchUsersList(search);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async (filter = "") => {
    try {
      const response = await api.post("/user/list-users", {
        filter,
      });

      // console.log(response)
      dispatch(setUsers(response.data));
    } catch (err) {
      // Handle any errors (e.g., invalid credentials)
    }
  };

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

      <br />
      <TextField
        label="Search User <Enter>"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update state on input change
        onKeyDown={(e) => {
          if (e.key === "Enter" && search) {
            handleSearch(search); // Trigger the parent search handler on Enter
          }
        }}
        style={{ marginBottom: "20px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {search && (
                <IconButton
                  onClick={() => {
                    setSearch("");
                    fetchUsersList("");
                  }}
                  edge="end"
                  aria-label="clear search"
                >
                  Clear
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      <UserTable />
    </Box>
  );
};

export default Dashboard;
