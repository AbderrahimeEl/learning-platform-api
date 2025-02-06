const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.post("/:courseId/lessons", lessonController.createLesson);
router.get("/:courseId/lessons", lessonController.getLessonsByCourse);
router.get("/lessons/:id", lessonController.getLessonById);
router.put("/lessons/:id", lessonController.updateLesson);
router.delete("/lessons/:id", lessonController.deleteLesson);

module.exports = router;