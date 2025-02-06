const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
}

// Get  User 
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user." });
  }
}

// Update User
async function updateUser(req, res) {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });

    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
}

// Delete User
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
