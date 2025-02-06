const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authMiddleware = require("../middlewares/authMiddleware");
const instructorMiddleware = require("../middlewares/instructorMiddleware");

router.post(
    "/:courseId/lessons",
    authMiddleware.authenticateUser,
    instructorMiddleware, 
    lessonController.createLesson
  );
router.get("/:courseId/lessons", lessonController.getLessonsByCourse);
router.get("/lessons/:id", lessonController.getLessonById);
router.put(
  "/lessons/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  lessonController.updateLesson
);
router.delete(
  "/lessons/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  lessonController.deleteLesson
);

module.exports = router;
