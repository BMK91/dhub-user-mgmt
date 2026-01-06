const express = require("express");
const router = express.Router();

const { register, login, listUsers } = require("../controllers/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");
const { authorizeRoles } = require("../middleware/RoleMiddleware");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// admin and moderator can list users
router.post("/list-users", authMiddleware, authorizeRoles("admin", "moderator"), listUsers);

module.exports = router;
