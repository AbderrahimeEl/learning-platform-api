// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.get('/create', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/', courseController.getCourses);

module.exports = router;