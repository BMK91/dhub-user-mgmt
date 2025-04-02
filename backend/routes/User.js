const express = require("express");
const router = express.Router();

const { register, login, listUsers } = require("../controllers/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

router.post("/list-users", authMiddleware, listUsers);

module.exports = router;
