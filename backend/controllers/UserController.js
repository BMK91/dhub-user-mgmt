const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");

const listUsers = async (req, res) => {
  try {
    const userRole = req.user?.role;
    if (!userRole || !["admin", "moderator"].includes(userRole)) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const { filter } = req.body;
    console.log({ filter });

    const users = await User.find({
      _id: {
        $ne: req.user.userId,
      },
      ...(userRole !== "admin"
        ? {
            role: {
              $ne: "admin",
            },
          }
        : {}),
      ...(filter
        ? {
            $or: [
              { name: { $regex: filter, $options: "i" } }, // Case-insensitive search for name
              { email: { $regex: filter, $options: "i" } }, // Case-insensitive search for email
            ],
          }
        : {}),
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Register User
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, name: user.name, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login, listUsers };
