const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const instructorMiddleware = require("../middlewares/instructorMiddleware");

router.post(
  "/create",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  courseController.createCourse
);

router.put(
  "/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  courseController.updateCourse
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  courseController.deleteCourse
);

router.get("/stats", courseController.getCourseStats);

router.get("/:id", courseController.getCourse);

router.get("/", courseController.getCourses);

module.exports = router;
