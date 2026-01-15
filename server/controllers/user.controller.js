const User = require("../models/user.model");

/**
 * GET /api/users/me
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "_id name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch {
    res.status(400).json({ message: "Invalid user id" });
  }
};
