const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/create', courseController.createCourse);

router.get('/stats', courseController.getCourseStats);

router.get('/:id', courseController.getCourse);

router.get('/', courseController.getCourses);

router.put('/:id', courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;