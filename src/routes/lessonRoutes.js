const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authMiddleware = require("../middlewares/authMiddleware");
const instructorMiddleware = require("../middlewares/instructorMiddleware");

/**
 * @swagger
 * /api/courses/{courseId}/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/:courseId/lessons",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  lessonController.createLesson
);

/**
 * @swagger
 * /api/courses/{courseId}/lessons:
 *   get:
 *     summary: Get all lessons for a course
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Lessons retrieved successfully
 *       400:
 *         description: Bad request
 */
router.get("/:courseId/lessons", lessonController.getLessonsByCourse);

/**
 * @swagger
 * /api/courses/lessons/{id}:
 *   get:
 *     summary: Get a lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson ID
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *       400:
 *         description: Bad request
 */
router.get("/lessons/:id", lessonController.getLessonById);

/**
 * @swagger
 * /api/courses/lessons/{id}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Bad request
 */
router.put(
  "/lessons/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  lessonController.updateLesson
);

/**
 * @swagger
 * /api/courses/lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson ID
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete(
  "/lessons/:id",
  authMiddleware.authenticateUser,
  instructorMiddleware,
  lessonController.deleteLesson
);

module.exports = router;
