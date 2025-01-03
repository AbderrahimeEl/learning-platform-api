// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
const mongoService = require('../services/mongoService');

async function getCourse(req, res) {
  // Logique pour obtenir un cours par ID
  try {
    const course = await mongoService.findOneById('courses', req.params.id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.json(course);
  } catch (error) {
    res.status(500).send('Error retrieving course: ' + error.message);
  }
}

async function getCourses(req, res) {
  try {
    const courses = await mongoService.findAll('courses');
    res.json(courses);
  } catch (error) {
    res.status(500).send('Error retrieving courses: ' + error.message);
  }
}

async function createCourse(req, res) {
  // Logique pour créer un cours
  try {
    const course = req.body;
    const result = await mongoService.insertOne('courses', course);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error creating course: ' + error.message);
  }
}


module.exports = {
  getCourse,
  getCourses,
  createCourse,
};