const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Course = require("../models/Course");



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

// Enroll in a Course
async function enrollInCourse(req, res) {
  try {
    const userId = req.params.id;
    const { courseId } = req.body;

    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to enroll this user." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: "User is already enrolled in this course." });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Enrollment successful.", enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ error: "Enrollment failed: " + error.message });
  }
}

// Get  Enrolled Courses
async function getUserEnrolledCourses(req, res) {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to access this user's courses." });
    }

    const user = await User.findById(userId).populate("enrolledCourses", "title description");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enrolled courses: " + error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  enrollInCourse,
  getUserEnrolledCourses,
};
